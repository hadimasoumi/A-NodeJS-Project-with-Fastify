import models from "../entities/schemas";
import {
  StockUpdatePriceInterface,
  StockCreateInterface,
} from "../entities/interfaces/stock.interface";

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

  public async getStockById(symbol: string): Promise<any> {
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
}

export default StockRepository;
