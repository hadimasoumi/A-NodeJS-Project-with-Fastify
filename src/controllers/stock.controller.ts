import StockRepository from "../repositories/stock.repository";

import { StockUpdatePriceInterface } from "../entities/interfaces/stock.interface";

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

export default {
  findAllStocks,
  updateStock,
};
