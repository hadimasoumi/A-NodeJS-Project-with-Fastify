import {
  StockInterface,
  StockHighLowInterface,
} from "../core/entities/interfaces/stock.interface";
import TradeHistoryRepository from "../repositories/tradeHistory.repository";
import StockController from "./stock.controller";
import TradeController from "./trade.controller";

import {
  TradeHistoryCreateInterface,
  TradeHistoryHighLowPriceInterface,
  TradeHistoryStatsInterface,
} from "../core/entities/interfaces/tradeHistory.interface";

async function deleteAllTradeHistory() {
  const tradeHistoryRepository = TradeHistoryRepository.getInstance();

  return tradeHistoryRepository
    .deleteAllTradeHistory()
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(
        "error in TradeHistoryConroller -> deleteAllTradeHistory >> ",
        error
      );
      throw new Error("400 : " + error.toString());
    });
}

async function findAllTradeHistoryBySymbol(
  symbol: string,
  startDate?: string,
  endDate?: string
) {
  const tradeHistoryRepository = TradeHistoryRepository.getInstance();

  return StockController.getStockBySymbol(symbol)
    .then((stock) => {
      if (stock.length > 0) {
        return tradeHistoryRepository.findAllTradeHistoryByStockId(
          stock[0].id,
          startDate,
          endDate
        );
      } else return null;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

async function getHightLowPriceTradeHistoryBySymbol(
  symbol: string,
  startDate?: string,
  endDate?: string
): Promise<any> {
  const stock = await StockController.getStockBySymbol(symbol);

  if (stock.length > 0) {
    const tradeHistoryRepository = TradeHistoryRepository.getInstance();

    return tradeHistoryRepository
      .findAllTradeHistoryByStockId(stock[0].id, startDate, endDate)
      .then((trades) => {
        let result: TradeHistoryHighLowPriceInterface = {
          symbol: symbol,
          highest: 0,
          lowest: 0,
        };
        if (trades.length > 0) {
          const prices: Array<number> = trades.map((x) => x.Trade?.price);
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

async function getStockStatsBySymbol(
  symbol: string,
  startDate?: string,
  endDate?: string
) {
  let response: TradeHistoryStatsInterface = { stock: symbol };
  return TradeController.GetTradesBySymbol(symbol, startDate, endDate)
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
async function getStocksStats(
  startDate?: string,
  endDate?: string
): Promise<any> {
  let result: Array<TradeHistoryStatsInterface> = [];

  try {
    const stocks: StockHighLowInterface[] =
      await StockController.findAllStocks();
    for (const stock of stocks) {
      const response: TradeHistoryStatsInterface = (await getStockStatsBySymbol(
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

  console.log("result 33333 >> ", result);
  return result;
  // } else return null;
}

async function createTradeHistory(reqCreate: TradeHistoryCreateInterface) {
  const tradeHistoryRepository = TradeHistoryRepository.getInstance();

  return tradeHistoryRepository
    .createTradeHistory(reqCreate)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(
        "error in tradeHistoryHandler -> createTradeHistory ---> ",
        error
      );
      throw new Error(error);
    });
}

export default {
  deleteAllTradeHistory,
  findAllTradeHistoryBySymbol,
  createTradeHistory,
  getHightLowPriceTradeHistoryBySymbol,
  getStocksStats,
  getStockStatsBySymbol,
};
