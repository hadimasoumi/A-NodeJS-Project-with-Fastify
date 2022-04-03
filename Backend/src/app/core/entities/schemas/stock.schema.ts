import { CreationOptional, Model, DataTypes } from "@sequelize/core";
import sequelize from "../../../core/adapters/sequelizeORM";

// ───────────────────────────────────────────────────────────────── Schema ─────
class Stock extends Model {
  declare id: CreationOptional<number>;
  declare symbol: string;
  declare name: string;
  declare price: number;
  declare total_shares: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    symbol: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT(2),
      allowNull: true,
      defaultValue: 0,
    },
    total_shares: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "stocks",
    sequelize,
  }
);

export default Stock;
