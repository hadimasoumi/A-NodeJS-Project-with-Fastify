import StockHistoryRepository from "../repositories/stockHistory.repository";
import StockController from "./stock.controller";

import { StockHistoryCreateInterface } from "../core/entities/interfaces/stockHistory.interface";

async function findAllStockHistoryBySymbol(symbol: string) {
  const stockHistoryRepository = StockHistoryRepository.getInstance();

  return StockController.getStockBySymbol(symbol)
    .then((stock) => {
      console.log("stock ---> ", stock);
      if (stock.length > 0) {
        console.log("stock ---> ", stock);
        return stockHistoryRepository.findAllStockHistoryByStockId(stock[0].id);
      } else return [];
    })
    .catch((error) => {
      throw new Error(error);
    });
}

async function createStockHistory(reqCreate: StockHistoryCreateInterface) {
  const stockHistoryRepository = StockHistoryRepository.getInstance();
  try {
    return await stockHistoryRepository.createStockHistory(reqCreate);
  } catch (err) {
    throw new Error(`400 : update data is not successfully`);
  }
}

export default {
  findAllStockHistoryBySymbol,
  createStockHistory,
};
