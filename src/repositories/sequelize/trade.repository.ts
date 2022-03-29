import models from "../../entities/schemas/sequelize";
// class TradeRepository {
//   constructor() {}

//   public async findAllTrades() {
//     models.Trade.findAll();
//   }
// }

// export default TradeRepository;

import config from "../../config";
import { TradeInterface } from "../../entities/interfaces/mongoose/trade.interface";
import { createTrade } from "../../entities/dtos/todo.dto";

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

          // where: { is_active: true },
          required: true,
          order: [["id", "DESC"]],
          // limit: 8,
        },
      ],
    });
    return result;
    // as TradeInterface[];
  }

  public async createTrade(trade: createTrade): Promise<any> {
    try {
      const result = await models.Trade.create({
        type: trade.type,
        user_id: trade.user_id,
        symbol: trade.symbol,
        shares: trade.shares,
        price: trade.price,
      });
      return result;
    } catch (error) {}
  }
}

export default TradeRepository;
