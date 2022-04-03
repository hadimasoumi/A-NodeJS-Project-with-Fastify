import Trade from "./trade.schema";
import User from "./user.schema";
import Stock from "./stock.schema";
import TradeHistory from "./tradeHistory.schema";

User.hasMany(Trade, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});

Trade.belongsTo(User, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});

Trade.belongsTo(Stock, {
  foreignKey: {
    name: "stock_id",
    allowNull: false,
  },
});

Stock.hasMany(Trade, {
  foreignKey: {
    name: "stock_id",
    allowNull: false,
  },
});

TradeHistory.belongsTo(Trade, {
  foreignKey: {
    name: "trade_id",
    allowNull: false,
  },
  onUpdate: "NO ACTION",
  onDelete: "NO ACTION",
});

TradeHistory.belongsTo(Stock, {
  foreignKey: {
    name: "stock_id",
    allowNull: false,
  },
  onUpdate: "NO ACTION",
  onDelete: "NO ACTION",
});

export default {
  Trade,
  User,
  Stock,
  TradeHistory,
};
