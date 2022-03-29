import Trade from "./trade.schema";
import User from "./user.schema";

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

export default {
  Trade,
  User,
};
