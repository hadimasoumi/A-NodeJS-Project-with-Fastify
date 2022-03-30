import StockHistoryRepository from "../repositories/stockHistory.repository";

import { StockHistoryCreateInterface } from "../core/entities/interfaces/stockHistory.interface";

async function findAllStockHistory(symbol: string) {
  const stockHistoryRepository = StockHistoryRepository.getInstance();
  return await stockHistoryRepository.findAllStockHistory(symbol);
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
  findAllStockHistory,
  createStockHistory,
};
