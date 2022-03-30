import models from "../entities/schemas";
import config from "../config";
import { TradeCreateDBInterface } from "../entities/interfaces/trade.interface";
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
        },
        {
          model: models.Stock,
          attributes: ["symbol"],
          required: true,
        },
      ],
      order: [["id", "ASC"]],
    });
    return result;
    // as TradeInterface[];
  }

  public createTrade(trade: TradeCreateDBInterface): Promise<any> {
    const object = {
      type: trade.type,
      user_id: trade.user_id,
      stock_id: trade.stock_id,
      shares: trade.shares,
      price: trade.price,
      createdAt: trade.createdAt,
      updatedAt: trade.updatedAt,
    };

    if (trade.id != undefined) object["id"] = trade.id;
    console.log("object ---> ", object);
    return models.Trade.create(object);
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

  public getTradeById(id: number): Promise<any> {
    return models.Trade.findAll({
      where: {
        id: id,
      },
    });
  }

  public async eraseTrades(): Promise<any> {
    const res = await models.Trade.destroy({
      // returning: true,
      // checkExistance: true,
      where: {},
      force: true,
    });
    console.log("res ---> ", res);
    return true;
  }
}

export default TradeRepository;
