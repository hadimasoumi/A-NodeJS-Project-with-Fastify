import moment from "moment";
import {
  TradeCreateRequestInterface,
  TradeCreateDBInterface,
  TradeGetResponseInterface,
  TradeHistoryStatsInterface,
  TradeHistoryHighLowPriceInterface,
  TradeHistoryStatsWithPricesInterface,
} from "../core/entities/interfaces/trade.interface";
import {
  StockInterface,
  StockHighLowInterface,
} from "../core/entities/interfaces/stock.interface";
import TradeRepository from "../repositories/trade.repository";
import StockController from "./stock.controller";
import UserController from "./user.controller";

async function DeleteAllTrades() {
  const tradeRepository = TradeRepository.getInstance();

  return tradeRepository
    .DeleteAllTrades()
    .then(async () => {
      await Promise.all([
        StockController.DeleteAllStocks(),
        UserController.DeleteAllUsers(),
      ]);
    })
    .then(() => {
      return `200 : trades was erased successfully`;
    })
    .catch((error) => {
      console.log("error >> ", error);
      throw new Error(`400 : Deleting operation was not successfully`);
    });
}

async function GetAllTrades() {
  const tradeRepository = TradeRepository.getInstance();
  return tradeRepository
    .GetAllTrades()
    .then((trades) => {
      let res: TradeGetResponseInterface[] = [];
      for (const trade of trades) {
        res.push({
          id: trade.id,
          type: trade.type,
          symbol: trade.Stock.symbol,
          shares: trade.shares,
          price: trade.price,
          timestamp: moment(trade.createdAt).format("yyyy-MM-DD HH:mm:ss"),
          user: trade.User,
        });
      }
      return res;
    })
    .catch((error) => {
      throw new Error(`400 : in GetAllTrades ` + error);
    });
}
async function GetTradesBySymbol(
  symbol: string,
  startDate?: string,
  endDate?: string
) {
  const tradeRepository = TradeRepository.getInstance();
  return tradeRepository
    .GetTradesBySymbol(symbol, startDate, endDate)
    .then((trades) => {
      let res: TradeGetResponseInterface[] = [];
      for (const trade of trades) {
        res.push({
          id: trade.id,
          type: trade.type,
          symbol: trade.Stock.symbol,
          shares: trade.shares,
          price: trade.price,
          timestamp: moment(trade.createdAt).format("yyyy-MM-DD HH:mm:ss"),
          user: trade.User,
        });
      }
      return res;
    })
    .catch((error) => {
      throw new Error(`400 : in GetTradesBySymbol ` + error.toString());
    });
}

async function CreateTrade(reqCreate: TradeCreateRequestInterface) {
  const tradeRepository = TradeRepository.getInstance();
  let finalresult: any;

  // TODO: add validator for reqBody
  if (reqCreate != undefined && reqCreate != null && reqCreate.symbol) {
    if (reqCreate.id) {
      const res = await tradeRepository.GetTradeById(reqCreate.id);
      if (res.length > 0) {
        throw new Error(`400 : Record already exists`);
      }
    }
    const stock: StockInterface = await StockController.CreateStockIfNotExists({
      symbol: reqCreate.symbol,
    });
    const user = await UserController.GetUserById(reqCreate.user.id);
    if (user.length == 0) {
      await UserController.CreateUser(reqCreate.user);
    }

    let reqCreateDB: TradeCreateDBInterface = {
      id: reqCreate.id,
      user_id: reqCreate.user.id,
      stock_id: stock.id,
      price: reqCreate.price,
      shares: reqCreate.shares,
      type: reqCreate.type,
    };

    if (reqCreate.timestamp != undefined) {
      reqCreateDB.createdAt = reqCreate.timestamp;
      reqCreateDB.updatedAt = reqCreate.timestamp;
    }

    await tradeRepository
      .CreateTrade(reqCreateDB)
      .then(async (result) => {
        await StockController.UpdateStock({
          id: reqCreateDB.stock_id,
          price: reqCreate.price,
        }).then(() => {
          finalresult = `201 : Save data is successfully`;
        });
      })
      .catch((error) => {
        console.log("error in tradeHandler -> createTrade ---> ", error);
        throw new Error("400 : " + error);
      });
  } else {
    throw new Error("400 : input can not be empty");
  }

  return finalresult;
}

async function GetTradesByUserId(UserID: number) {
  const tradeRepository = TradeRepository.getInstance();

  const user = await UserController.GetUserById(UserID)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(
        "erro occured in TradeCountroller -> getTradeByUserId >> ",
        error
      );
      throw new Error(error);
    });
  if (user?.length > 0) {
    return tradeRepository
      .GetTradesByUserId(UserID)
      .then((trades) => {
        if (trades.length > 0) {
          let result: Array<TradeGetResponseInterface> = [];

          for (const trade of trades) {
            result.push({
              id: trade.id,
              symbol: trade.Stock?.symbol,
              type: trade.type,
              shares: trade.shares,
              price: trade.price,
              timestamp: moment(trade.createdAt).format("yyyy-MM-DD HH:mm:ss"),
              user: trade.User,
            });
          }
          return result;
        } else return [];
      })
      .catch((error) => {
        console.log(
          "erro occured in TradeCountroller -> GetTradesByUserId >> ",
          error
        );
        throw new Error(error);
      });
  } else {
    throw new Error("404 : user does not exist");
  }
}

async function GetStockHightLowPriceBySymbol(
  symbol: string,
  startDate?: string,
  endDate?: string
): Promise<any> {
  const stock = await StockController.GetStockBySymbol(symbol);

  if (stock.length > 0) {
    const tradeRepository = TradeRepository.getInstance();

    return tradeRepository
      .GetTradesByStockId(stock[0].id, startDate, endDate)
      .then((trades) => {
        let result: TradeHistoryHighLowPriceInterface = {
          symbol: symbol,
          highest: 0,
          lowest: 0,
        };
        if (trades.length > 0) {
          const prices: Array<number> = trades.map((x) => x?.price);
          result.highest = Math.max(...prices);
          result.lowest = Math.min(...prices);
        } else
          return {
            message: "There are no trades in the given date range",
          };

        return result;
      })
      .catch((error) => {
        console.log(
          "error in tradeHistoryHandler -> findAllTradeHistoryBySymbol ---> ",
          error
        );
        throw new Error(error);
      });
  } else throw new Error("404 : symbol does not exis");
}

async function GetStockStatsBySymbol(
  symbol: string,
  startDate?: string,
  endDate?: string
) {
  let response: TradeHistoryStatsInterface = { stock: symbol };
  return GetTradesBySymbol(symbol, startDate, endDate)
    .then(async (trades) => {
      console.log("trades.length >> ", trades.length);
      if (trades.length == 0) {
        response.message = "There are no trades in the given date range";
      } else {
        const prices = trades.map((x) => x.price);
        const stats = await detectStockFluctuation(prices);
        response.fluctuations = stats?.fluctuations;
        response.max_rise = stats?.max_rise;
        response.max_fall = stats?.max_fall;
        // response.prices = prices;
      }
      console.log("response >> ", response);

      return response;
    })
    .catch((error) => {
      console.log("error >> ", error);
    });
}

async function GetStocksStats(
  startDate?: string,
  endDate?: string
): Promise<any> {
  let result: Array<TradeHistoryStatsInterface> = [];

  try {
    const stocks: StockHighLowInterface[] =
      await StockController.GetAllStocks();
    for (const stock of stocks) {
      const response: TradeHistoryStatsInterface = (await GetStockStatsBySymbol(
        stock.symbol,
        startDate,
        endDate
      )) as TradeHistoryStatsInterface;
      result.push(response);
    }
    return result;
  } catch (error) {
    console.log(
      "error in tradeHistoryHandler -> findAllTradeHistoryBySymbol ---> ",
      error
    );
    // throw new Error(error.toString());
  }
}

async function GetStockStatsWithPricesBySymbol(
  symbol: string,
  startDate?: string,
  endDate?: string
) {
  let response: TradeHistoryStatsWithPricesInterface = { stock: symbol };
  return GetTradesBySymbol(symbol, startDate, endDate)
    .then(async (trades) => {
      console.log("trades.length >> ", trades.length);
      if (trades.length == 0) {
        response.message = "There are no trades in the given date range";
      } else {
        const prices = trades.map((x) => x.price);
        const stats = await detectStockFluctuation(prices);
        response.fluctuations = stats?.fluctuations;
        response.max_rise = stats?.max_rise;
        response.max_fall = stats?.max_fall;
        response.prices = prices;
      }
      console.log("response >> ", response);

      return response;
    })
    .catch((error) => {
      console.log("error >> ", error);
    });
}

async function GetStocksStatsWithPrices(
  startDate?: string,
  endDate?: string
): Promise<any> {
  let result: Array<TradeHistoryStatsWithPricesInterface> = [];

  try {
    const stocks: StockHighLowInterface[] =
      await StockController.GetAllStocks();
    for (const stock of stocks) {
      const response: TradeHistoryStatsWithPricesInterface =
        (await GetStockStatsWithPricesBySymbol(
          stock.symbol,
          startDate,
          endDate
        )) as TradeHistoryStatsWithPricesInterface;
      result.push(response);
    }
    return result;
  } catch (error) {
    console.log(
      "error in tradeHistoryHandler -> findAllTradeHistoryBySymbol ---> ",
      error
    );
    // throw new Error(error.toString());
  }
}

function detectStockFluctuation(prices: Array<number>) {
  const fluctuation: Array<number> = [];
  let rises: Array<number> = [];
  let falls: Array<number> = [];
  let expect: "rise" | "fall";
  if (prices[0] < prices[1]) expect = "rise";
  else expect = "fall";

  prices.map((_, index) => {
    if (index != prices.length - 1) {
      if (prices[index] < prices[index + 1]) {
        if (expect != "rise") {
          fluctuation.push(prices[index]);
        }
        rises.push(prices[index + 1] - prices[index]);
        expect = "rise";
      } else if (prices[index] > prices[index + 1]) {
        if (expect != "fall") {
          fluctuation.push(prices[index]);
        }
        falls.push(prices[index] - prices[index + 1]);
        expect = "fall";
      }
    }
  });

  let result: {
    max_rise: number;
    max_fall: number;
    fluctuations: number;
  } = { max_rise: 0, max_fall: 0, fluctuations: 0 };

  result.fluctuations = fluctuation.length;
  result.max_rise =
    rises.length > 0 ? parseFloat(Math.max(...rises).toFixed(2)) : 0.0;
  result.max_fall =
    falls.length > 0 ? parseFloat(Math.max(...falls).toFixed(2)) : 0.0;

  return result;
}

export default {
  GetAllTrades,
  CreateTrade,
  GetTradesByUserId,
  DeleteAllTrades,
  GetTradesBySymbol,
  GetStockStatsBySymbol,
  GetStockHightLowPriceBySymbol,
  GetStocksStats,
  GetStocksStatsWithPrices,
};
