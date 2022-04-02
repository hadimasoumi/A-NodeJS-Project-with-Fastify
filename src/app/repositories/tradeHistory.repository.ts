import { Op } from "@sequelize/core";
import MOMENT from "moment";
import models from "../core/entities/schemas";
import { TradeHistoryCreateInterface } from "../core/entities/interfaces/tradeHistory.interface";

class TradeHistoryRepository {
  private static instance: TradeHistoryRepository;

  constructor() {}

  public static getInstance(): TradeHistoryRepository {
    if (!TradeHistoryRepository.instance) {
      TradeHistoryRepository.instance = new TradeHistoryRepository();
    }
    return TradeHistoryRepository.instance;
  }

  public async deleteAllTradeHistory(): Promise<any> {
    return models.TradeHistory.destroy({
      where: {},
      force: true,
    });
  }

  public async findAllTradeHistoryByStockId(
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
    return await models.TradeHistory.findAll({
      include: [
        {
          model: models.Stock,
          attributes: ["symbol"],
          required: true,
          where: {
            id: stockId,
          },
        },
        {
          model: models.Trade,
          attributes: ["price", "shares", "createdAt"],
          required: true,
          where: whereClause,
        },
      ],
    });
  }

  public createTradeHistory(
    stockHistory: TradeHistoryCreateInterface
  ): Promise<any> {
    return models.TradeHistory.create({
      price: stockHistory.price,
      trade_id: stockHistory.trade_id,
      stock_id: stockHistory.stock_id,
    });
  }
}

export default TradeHistoryRepository;
