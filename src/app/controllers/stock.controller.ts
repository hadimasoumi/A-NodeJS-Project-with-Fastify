import StockRepository from "../repositories/stock.repository";

import {
  StockUpdatePriceInterface,
  StockCreateInterface,
} from "../core/entities/interfaces/stock.interface";

async function deleteAllStocks(): Promise<any> {
  const tradeRepository = StockRepository.getInstance();
  tradeRepository
    .deleteAllStocks()
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("error in StockConroller -> deleteAllStocks >> ", error);
      throw new Error("400 : " + error.toString());
    });
}

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
    return await stockRepository.getStockBySymbol(symbol);
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

async function upsertStock(reqCreate: StockCreateInterface) {
  const stockRepository = StockRepository.getInstance();
  return stockRepository
    .upsertStock(reqCreate)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("error in stockController -> upsertStock ---> ", error);
      throw new Error(error);
    });
}

async function createStockIfNotExists(reqCreate: StockCreateInterface) {
  if (reqCreate.symbol == "AAV") console.log("re >> ", reqCreate);
  const stockRepository = StockRepository.getInstance();
  return stockRepository
    .createStockIfNotExists(reqCreate)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(
        "error in stockController -> createStockIfNotExists ---> ",
        error
      );
      throw new Error(error);
    });
}

export default {
  deleteAllStocks,
  findAllStocks,
  updateStock,
  getStockBySymbol,
  createStock,
  upsertStock,
  createStockIfNotExists,
};
