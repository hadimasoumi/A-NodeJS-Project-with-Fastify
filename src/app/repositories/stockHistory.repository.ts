import models from "../core/entities/schemas";
import { StockHistoryCreateInterface } from "../core/entities/interfaces/stockHistory.interface";

class StockRepository {
  private static instance: StockRepository;

  constructor() {}

  public static getInstance(): StockRepository {
    if (!StockRepository.instance) {
      StockRepository.instance = new StockRepository();
    }
    return StockRepository.instance;
  }

  public async findAllStockHistory(symbol: string): Promise<any> {
    return await models.StockHistory.findAll({
      include: [
        {
          model: models.Stock,
          attributes: ["symbol"],
          required: true,
          where: {
            symbol: symbol,
          },
        },
        {
          model: models.Trade,
          attributes: ["price", "shares", "createdAt"],
          required: true,
        },
      ],
    });
  }

  public async createStockHistory(
    stockHistory: StockHistoryCreateInterface
  ): Promise<any> {
    try {
      const result = await models.StockHistory.create({
        price: stockHistory.price,
        trade_id: stockHistory.trade_id,
        stock_id: stockHistory.stock_id,
      });
      return result;
    } catch (error) {}
  }
}

export default StockRepository;
