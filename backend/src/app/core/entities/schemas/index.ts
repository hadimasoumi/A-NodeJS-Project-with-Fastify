import Trade from "./trade.schema";
import User from "./user.schema";
import Stock from "./stock.schema";

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

export default {
  Trade,
  User,
  Stock,
};
