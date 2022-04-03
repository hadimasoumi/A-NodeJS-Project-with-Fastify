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

  public async DeleteAllStocks(): Promise<any> {
    return models.Stock.destroy({
      where: {},
      force: true,
    });
  }

  public async GetAllStocks(): Promise<any> {
    return await models.Stock.findAll();
  }

  public async UpdateStock(stock: StockUpdatePriceInterface): Promise<any> {
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

  public async GetStockBySymbol(symbol: string): Promise<any> {
    try {
      const result = await models.Stock.findAll({
        where: {
          symbol: symbol,
        },
      });
      return result;
    } catch (error) {}
  }

  public async CreateStock(stock): Promise<any> {
    if (stock.symbol == "AAV") console.log("stock33333 >> ");
    return models.Stock.create(stock)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log("error in stockRepository -> createStock ---> ", error);
        throw new Error(error);
      });
  }
  public async UpsertStock(stock): Promise<any> {
    try {
      const result = await models.Stock.upsert(stock);
      console.log("result ---> ", result);
      return result;
    } catch (error) {}
  }

  createStockIfNotExists = async (reqCreate: StockCreateInterface) => {
    const stockRepository = StockRepository.getInstance();

    return stockRepository
      .GetStockBySymbol(reqCreate.symbol)
      .then(async (result) => {
        if (result.length > 0) {
          return result[0];
        } else {
          return this.CreateStock(reqCreate);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
}

export default StockRepository;
