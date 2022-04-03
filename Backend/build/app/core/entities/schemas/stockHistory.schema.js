"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const sequelizeORM_1 = __importDefault(require("../../adapters/sequelizeORM"));
class StockHistory extends core_1.Model {
}
StockHistory.init({
    id: {
        type: core_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    stock_id: {
        type: core_1.DataTypes.INTEGER,
        allowNull: false,
    },
    trade_id: {
        type: core_1.DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: core_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: core_1.DataTypes.DATE,
    },
}, {
    tableName: "stocks_histories",
    sequelize: sequelizeORM_1.default,
});
exports.default = StockHistory;
//# sourceMappingURL=stockHistory.schema.js.map