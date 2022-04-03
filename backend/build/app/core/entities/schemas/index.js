"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trade_schema_1 = __importDefault(require("./trade.schema"));
const user_schema_1 = __importDefault(require("./user.schema"));
const stock_schema_1 = __importDefault(require("./stock.schema"));
const tradeHistory_schema_1 = __importDefault(require("./tradeHistory.schema"));
user_schema_1.default.hasMany(trade_schema_1.default, {
    foreignKey: {
        name: "user_id",
        allowNull: false,
    },
});
trade_schema_1.default.belongsTo(user_schema_1.default, {
    foreignKey: {
        name: "user_id",
        allowNull: false,
    },
});
trade_schema_1.default.belongsTo(stock_schema_1.default, {
    foreignKey: {
        name: "stock_id",
        allowNull: false,
    },
});
stock_schema_1.default.hasMany(trade_schema_1.default, {
    foreignKey: {
        name: "stock_id",
        allowNull: false,
    },
});
tradeHistory_schema_1.default.belongsTo(trade_schema_1.default, {
    foreignKey: {
        name: "trade_id",
        allowNull: false,
    },
    onUpdate: "NO ACTION",
    onDelete: "NO ACTION",
});
tradeHistory_schema_1.default.belongsTo(stock_schema_1.default, {
    foreignKey: {
        name: "stock_id",
        allowNull: false,
    },
    onUpdate: "NO ACTION",
    onDelete: "NO ACTION",
});
exports.default = {
    Trade: trade_schema_1.default,
    User: user_schema_1.default,
    Stock: stock_schema_1.default,
    TradeHistory: tradeHistory_schema_1.default,
};
//# sourceMappingURL=index.js.map