import StockRepository from "../repositories/stock.repository";
import TradeController from "./trade.controller";
import {
  StockUpdatePriceInterface,
  StockCreateInterface,
  StockHighLowInterface,
} from "../core/entities/interfaces/stock.interface";

async function DeleteAllStocks(): Promise<any> {
  const tradeRepository = StockRepository.getInstance();
  tradeRepository
    .DeleteAllStocks()
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("error in StockConroller -> DeleteAllStocks >> ", error);
      throw new Error("400 : " + error.toString());
    });
}

async function GetAllStocks() {
  const tradeRepository = StockRepository.getInstance();
  let result: Array<StockHighLowInterface> = [];
  return tradeRepository
    .GetAllStocks()
    .then(async (stocks) => {
      for (const stock of stocks) {
        const highlow = await TradeController.GetStockHightLowPriceBySymbol(
          stock.symbol
        );
        const response: StockHighLowInterface = {
          id: stock.id,
          symbol: stock.symbol,
          price: stock.price,
          highest: highlow.highest,
          lowest: highlow.lowest,
        };
        result.push(response);
      }
      return result;
    })
    .catch((error) => {
      console.log("error in stockController -> GetAllStocks ---> ", error);
      throw new Error(error);
    });
}

async function UpdateStock(reqUpdate: StockUpdatePriceInterface) {
  const stockRepository = StockRepository.getInstance();
  try {
    await stockRepository.UpdateStock(reqUpdate);
    return `201 : Save data is successfully`;
  } catch (err) {
    throw new Error(`400 : update data is not successfully`);
  }
}

async function GetStockBySymbol(symbol: string) {
  const stockRepository = StockRepository.getInstance();
  try {
    return await stockRepository.GetStockBySymbol(symbol);
  } catch (err) {
    throw new Error(`400 : Save data is not successfully`);
  }
}

async function CreateStock(reqCreate: StockCreateInterface) {
  const stockRepository = StockRepository.getInstance();
  try {
    await stockRepository.CreateStock(reqCreate);
    return `201 : Save data is successfully`;
  } catch (err) {
    throw new Error(`400 : update data is not successfully`);
  }
}

async function UpsertStock(reqCreate: StockCreateInterface) {
  const stockRepository = StockRepository.getInstance();
  return stockRepository
    .UpsertStock(reqCreate)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("error in stockController -> upsertStock ---> ", error);
      throw new Error(error);
    });
}

async function CreateStockIfNotExists(reqCreate: StockCreateInterface) {
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
  DeleteAllStocks,
  GetAllStocks,
  UpdateStock,
  GetStockBySymbol,
  CreateStock,
  UpsertStock,
  CreateStockIfNotExists,
};
