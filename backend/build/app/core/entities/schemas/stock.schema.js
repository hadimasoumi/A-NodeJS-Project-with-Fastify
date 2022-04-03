"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const sequelizeORM_1 = __importDefault(require("../../../core/adapters/sequelizeORM"));
class Stock extends core_1.Model {
}
Stock.init({
    id: {
        type: core_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    symbol: {
        type: core_1.DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    name: {
        type: core_1.DataTypes.STRING(50),
        allowNull: true,
    },
    price: {
        type: core_1.DataTypes.FLOAT(2),
        allowNull: true,
        defaultValue: 0,
    },
    total_shares: {
        type: core_1.DataTypes.INTEGER,
        allowNull: true,
    },
    createdAt: {
        type: core_1.DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: core_1.DataTypes.DATE,
    },
}, {
    tableName: "stocks",
    sequelize: sequelizeORM_1.default,
});
exports.default = Stock;
//# sourceMappingURL=stock.schema.js.map