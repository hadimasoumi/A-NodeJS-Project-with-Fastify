import { CreationOptional, Model, DataTypes } from "@sequelize/core";
import sequelize from "../../adapters/sequelizeORM";

// ───────────────────────────────────────────────────────────────── Schema ─────
class TradeHistory extends Model {
  declare id: CreationOptional<number>;
  declare symbol: string;
  declare price: number;
  declare trade_id: number;
  declare stock_id: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

TradeHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trade_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "trades_histories",
    sequelize,
  }
);

export default TradeHistory;
