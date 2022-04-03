import { Op } from "@sequelize/core";
import MOMENT from "moment";
import models from "../core/entities/schemas";
import { TradeCreateDBInterface } from "../core/entities/interfaces/trade.interface";
class TradeRepository {
  private static instance: TradeRepository;

  constructor() {}

  public static getInstance(): TradeRepository {
    if (!TradeRepository.instance) {
      TradeRepository.instance = new TradeRepository();
    }
    return TradeRepository.instance;
  }

  public async GetAllTrades(): Promise<any> {
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

  public async GetTradesBySymbol(
    symbol,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    let whereClause = {};
    if (startDate && endDate) {
      whereClause["createdAt"] = {
        [Op.between]: [
          startDate
            ? MOMENT(startDate).format("YYYY-MM-DD")
            : MOMENT().format("YYYY-MM-DD"),
          endDate
            ? MOMENT(endDate).format("YYYY-MM-DD")
            : MOMENT().format("YYYY-MM-DD"),
        ],
      };
    }

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
          where: {
            symbol: symbol,
          },
        },
      ],
      order: [["id", "ASC"]],
      where: whereClause,
    });
    return result;
    // as TradeInterface[];
  }

  public CreateTrade(trade: TradeCreateDBInterface): Promise<any> {
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
    return models.Trade.create(object);
  }

  public async GetTradesByUserId(id: number): Promise<any> {
    try {
      const result = await models.Trade.findAll({
        include: [
          {
            model: models.Stock,
            attributes: ["symbol"],
            required: true,
          },
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

  public GetTradeById(id: number): Promise<any> {
    return models.Trade.findAll({
      where: {
        id: id,
      },
    });
  }

  public DeleteAllTrades(): Promise<any> {
    return models.Trade.destroy({
      where: {},
      force: true,
    });
  }

  public async GetTradesByStockId(
    stockId: number,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    let whereClause = {};
    if (startDate && endDate) {
      whereClause["createdAt"] = {
        [Op.between]: [
          startDate
            ? MOMENT(startDate).format("YYYY-MM-DD")
            : MOMENT().format("YYYY-MM-DD"),
          endDate
            ? MOMENT(endDate).format("YYYY-MM-DD")
            : MOMENT().format("YYYY-MM-DD HH:mm:ss"),
        ],
      };
    }
    return await models.Trade.findAll({
      attributes: ["price", "shares", "createdAt"],
      include: [
        {
          model: models.Stock,
          attributes: ["symbol"],
          required: true,
          where: {
            id: stockId,
          },
          order: [["symbol", "ASC"]],
        },
      ],
      where: whereClause,
    });
  }
}

export default TradeRepository;
