import { StockInterface } from "../core/entities/interfaces/stock.interface";
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
  const tradeHistoryRepository = TradeHistoryRepository.getInstance();

  return StockController.getStockBySymbol(symbol)
    .then(async (stock) => {
      console.log("stock >> ", stock);
      let response: TradeHistoryStatsInterface = { stock: stock[0].symbol };
      const trades = await TradeController.findTradesBySymbol(
        stock[0].symbol,
        startDate,
        endDate
      );

      if (trades.length == 0) {
        response.message = "There are no trades in the given date range";
      } else {
        // if (trades.length < 3) {
        //   response.fluctuations = 0;
        //   response.max_rise = 0.0;
        //   response.max_fall = 0.0;
        // } else {
        const prices = trades.map((x) => x.price);
        // console.log("prices >> ", prices);
        const stats = await detectStockFluctuation(prices);
        console.log("stats >> ", stats);
        response.fluctuations = stats?.fluctuations;
        response.max_rise = stats?.max_rise;
        response.max_fall = stats?.max_fall;
        response.prices = prices;
        // }
      }
      console.log("response >> ", response);

      return response;
    })
    .catch((error) => {});
}
async function getStocksStats(
  startDate?: string,
  endDate?: string
): Promise<any> {
  const tradeHistoryRepository = TradeHistoryRepository.getInstance();

  let result: Array<TradeHistoryStatsInterface> = [];

  try {
    const stocks: StockInterface[] = await StockController.findAllStocks();
    for (const stock of stocks) {
      let response: TradeHistoryStatsInterface = { stock: stock.symbol };
      const trades = await tradeHistoryRepository.findAllTradeHistoryByStockId(
        stock.id
      );

      if (trades.length == 0) {
        response.message = "There are no trades in the given date range";
        result.push(response);
      } else {
        if (trades.length < 3) {
          response.fluctuations = 0;
          response.max_rise = 0.0;
          response.max_fall = 0.0;
        } else {
          const prices = trades.map((x) => x.price);
          console.log("prices >> ", prices);
          return detectStockFluctuation(prices);
        }
      }
      console.log("response >> ", response);
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
  // if (prices.length >= 3) {
  const first = prices[0];
  const end = prices[prices.length - 1];
  // const max = Math.max(...prices);
  // const maxIndex = prices.indexOf(max);
  // const min = Math.min(...prices);
  // const minIndex = prices.indexOf(min);

  // if (maxIndex > minIndex) {
  //   result.max_rise = max;
  //   if ( max > prices[prices.length - 1] ) {
  //     result.fluctuations
  //   } else {
  //   }
  // } else {
  // }
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
