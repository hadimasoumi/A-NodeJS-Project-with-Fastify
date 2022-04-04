"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const moment_1 = __importDefault(require("moment"));
const schemas_1 = __importDefault(require("../core/entities/schemas"));
class TradeRepository {
    constructor() { }
    static getInstance() {
        if (!TradeRepository.instance) {
            TradeRepository.instance = new TradeRepository();
        }
        return TradeRepository.instance;
    }
    async GetAllTrades() {
        const result = await schemas_1.default.Trade.findAll({
            include: [
                {
                    model: schemas_1.default.User,
                    attributes: ["id", "name"],
                    required: true,
                },
                {
                    model: schemas_1.default.Stock,
                    attributes: ["symbol"],
                    required: true,
                },
            ],
            order: [["id", "ASC"]],
        });
        return result;
    }
    async GetTradesBySymbol(symbol, startDate, endDate) {
        let whereClause = {};
        if (startDate && endDate) {
            whereClause["createdAt"] = {
                [core_1.Op.between]: [
                    startDate
                        ? (0, moment_1.default)(startDate).format("YYYY-MM-DD")
                        : (0, moment_1.default)().format("YYYY-MM-DD"),
                    endDate
                        ? (0, moment_1.default)(endDate).format("YYYY-MM-DD")
                        : (0, moment_1.default)().format("YYYY-MM-DD"),
                ],
            };
        }
        const result = await schemas_1.default.Trade.findAll({
            include: [
                {
                    model: schemas_1.default.User,
                    attributes: ["id", "name"],
                    required: true,
                },
                {
                    model: schemas_1.default.Stock,
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
    }
    CreateTrade(trade) {
        const object = {
            type: trade.type,
            user_id: trade.user_id,
            stock_id: trade.stock_id,
            shares: trade.shares,
            price: trade.price,
            createdAt: trade.createdAt,
            updatedAt: trade.updatedAt,
        };
        if (trade.id != undefined)
            object["id"] = trade.id;
        return schemas_1.default.Trade.create(object);
    }
    async GetTradesByUserId(id) {
        try {
            const result = await schemas_1.default.Trade.findAll({
                include: [
                    {
                        model: schemas_1.default.Stock,
                        attributes: ["symbol"],
                        required: true,
                    },
                    {
                        model: schemas_1.default.User,
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
        }
        catch (error) { }
    }
    GetTradeById(id) {
        return schemas_1.default.Trade.findAll({
            where: {
                id: id,
            },
        });
    }
    DeleteAllTrades() {
        return schemas_1.default.Trade.destroy({
            where: {},
            force: true,
        });
    }
    async GetTradesByStockId(stockId, startDate, endDate) {
        let whereClause = {};
        if (startDate && endDate) {
            whereClause["createdAt"] = {
                [core_1.Op.between]: [
                    startDate
                        ? (0, moment_1.default)(startDate).format("YYYY-MM-DD")
                        : (0, moment_1.default)().format("YYYY-MM-DD"),
                    endDate
                        ? (0, moment_1.default)(endDate).format("YYYY-MM-DD")
                        : (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"),
                ],
            };
        }
        return await schemas_1.default.Trade.findAll({
            attributes: ["price", "shares", "createdAt"],
            include: [
                {
                    model: schemas_1.default.Stock,
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
exports.default = TradeRepository;
//# sourceMappingURL=trade.repository.js.map