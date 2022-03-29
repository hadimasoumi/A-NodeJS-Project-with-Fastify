import models from "../entities/schemas";
import config from "../config";
import { CreateTradeInterface } from "../entities/interfaces/trade.interface";

class TradeRepository {
  private static instance: TradeRepository;

  constructor() {}

  public static getInstance(): TradeRepository {
    if (!TradeRepository.instance) {
      TradeRepository.instance = new TradeRepository();
    }
    return TradeRepository.instance;
  }

  public async findAllTrades(): Promise<any> {
    const result = await models.Trade.findAll({
      include: [
        {
          model: models.User,
          attributes: ["id", "name"],
          required: true,
          order: [["id", "ASC"]],
        },
      ],
    });
    return result;
    // as TradeInterface[];
  }

  public async createTrade(trade: CreateTradeInterface): Promise<any> {
    try {
      const result = await models.Trade.create({
        type: trade.type,
        user_id: trade.user_id,
        stock_id: trade.stock_id,
        shares: trade.shares,
        price: trade.price,
      });
      return result;
    } catch (error) {}
  }

  public async getTradeByUserId(id: number): Promise<any> {
    try {
      const result = await models.Trade.findAll({
        include: [
          {
            model: models.User,
            attributes: ["id", "name"],
            required: true,
            order: [["id", "ASC"]],
            where: {
              id: id,
            },
          },
        ],
      });
      return result;
    } catch (error) {}
  }
}

export default TradeRepository;
