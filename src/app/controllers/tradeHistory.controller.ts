import TradeHistoryRepository from "../repositories/tradeHistory.repository";
import StockController from "./stock.controller";

import { TradeHistoryCreateInterface } from "../core/entities/interfaces/tradeHistory.interface";

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
async function findAllStockHistoryBySymbol(
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
      } else return [];
    })
    .catch((error) => {
      throw new Error(error);
    });
}

async function createTradeHistory(reqCreate: TradeHistoryCreateInterface) {
  const tradeHistoryRepository = TradeHistoryRepository.getInstance();
  try {
    return await tradeHistoryRepository.createTradeHistory(reqCreate);
  } catch (err) {
    throw new Error(`400 : update data is not successfully`);
  }
}

export default {
  deleteAllTradeHistory,
  findAllStockHistoryBySymbol,
  createTradeHistory,
};
