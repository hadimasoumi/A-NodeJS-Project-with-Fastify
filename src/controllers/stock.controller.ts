import StockRepository from "../repositories/stock.repository";

import {
  StockUpdatePriceInterface,
  StockCreateInterface,
} from "../entities/interfaces/stock.interface";

async function findAllStocks() {
  const tradeRepository = StockRepository.getInstance();
  return await tradeRepository.findAllStocks();
}

async function updateStock(reqUpdate: StockUpdatePriceInterface) {
  const stockRepository = StockRepository.getInstance();
  try {
    await stockRepository.updateStock(reqUpdate);
    return `201 : Save data is successfully`;
  } catch (err) {
    throw new Error(`400 : update data is not successfully`);
  }
}

async function getStockBySymbol(symbol: string) {
  const stockRepository = StockRepository.getInstance();
  try {
    return await stockRepository.getStockById(symbol);
  } catch (err) {
    throw new Error(`400 : Save data is not successfully`);
  }
}

async function createStock(reqCreate: StockCreateInterface) {
  const stockRepository = StockRepository.getInstance();
  try {
    await stockRepository.createStock(reqCreate);
    return `201 : Save data is successfully`;
  } catch (err) {
    throw new Error(`400 : update data is not successfully`);
  }
}

export default {
  findAllStocks,
  updateStock,
  getStockBySymbol,
  createStock,
};
