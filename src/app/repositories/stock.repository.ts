import models from "../core/entities/schemas";
import {
  StockUpdatePriceInterface,
  StockCreateInterface,
} from "../core/entities/interfaces/stock.interface";

class StockRepository {
  private static instance: StockRepository;

  constructor() {}

  public static getInstance(): StockRepository {
    if (!StockRepository.instance) {
      StockRepository.instance = new StockRepository();
    }
    return StockRepository.instance;
  }

  public async findAllStocks(): Promise<any> {
    return await models.Stock.findAll();
  }

  public async updateStock(stock: StockUpdatePriceInterface): Promise<any> {
    try {
      const result = await models.Stock.update(
        {
          price: stock.price,
        },
        {
          where: {
            id: stock.id,
          },
        }
      );
      return result;
    } catch (error) {}
  }

  public async getStockBySymbol(symbol: string): Promise<any> {
    try {
      const result = await models.Stock.findAll({
        where: {
          symbol: symbol,
        },
      });
      return result;
    } catch (error) {}
  }

  public async createStock(stock): Promise<any> {
    try {
      const result = await models.Stock.create(stock);
      return result;
    } catch (error) {}
  }
  public async upsertStock(stock): Promise<any> {
    try {
      const result = await models.Stock.upsert(stock);
      console.log("result ---> ", result);
      return result;
    } catch (error) {}
  }

  createStockIfNotExists = async (reqCreate: StockCreateInterface) => {
    const stockRepository = StockRepository.getInstance();

    return stockRepository
      .getStockBySymbol(reqCreate.symbol)
      .then(async (result) => {
        if (result.length > 0) {
          return result[0];
        } else {
          return this.createStock(reqCreate);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
}

export default StockRepository;
