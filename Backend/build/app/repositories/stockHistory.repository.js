"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const moment_1 = __importDefault(require("moment"));
const schemas_1 = __importDefault(require("../core/entities/schemas"));
class StockRepository {
    constructor() { }
    static getInstance() {
        if (!StockRepository.instance) {
            StockRepository.instance = new StockRepository();
        }
        return StockRepository.instance;
    }
    async findAllStockHistoryByStockId(stockId, startDate, endDate) {
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
        return await schemas_1.default.StockHistory.findAll({
            include: [
                {
                    model: schemas_1.default.Stock,
                    attributes: ["symbol"],
                    required: true,
                    where: {
                        id: stockId,
                    },
                },
                {
                    model: schemas_1.default.Trade,
                    attributes: ["price", "shares", "createdAt"],
                    required: true,
                    where: whereClause,
                },
            ],
        });
    }
    async createStockHistory(stockHistory) {
        try {
            const result = await schemas_1.default.StockHistory.create({
                price: stockHistory.price,
                trade_id: stockHistory.trade_id,
                stock_id: stockHistory.stock_id,
            });
            return result;
        }
        catch (error) { }
    }
}
exports.default = StockRepository;
//# sourceMappingURL=stockHistory.repository.js.map