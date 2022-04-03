"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const sequelizeORM_1 = __importDefault(require("../../adapters/sequelizeORM"));
class Trade extends core_1.Model {
}
Trade.init({
    id: {
        type: core_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: core_1.DataTypes.INTEGER,
        allowNull: false,
    },
    stock_id: {
        type: core_1.DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: core_1.DataTypes.STRING(4),
        allowNull: false,
    },
    shares: {
        type: core_1.DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: core_1.DataTypes.FLOAT(2),
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
    tableName: "trades",
    sequelize: sequelizeORM_1.default,
});
exports.default = Trade;
//# sourceMappingURL=trade.schema.js.map