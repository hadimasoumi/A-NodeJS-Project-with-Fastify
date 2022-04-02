import TradeHistoryRepository from "../repositories/tradeHistory.repository";
import StockController from "./stock.controller";

import {
  TradeHistoryCreateInterface,
  TradeHistoryHighLowPriceInterface,
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
          const prices = trades.map((x) => x.Trade?.price);
          result.highest = Math.max(prices);
          result.lowest = Math.min(prices);
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
};
