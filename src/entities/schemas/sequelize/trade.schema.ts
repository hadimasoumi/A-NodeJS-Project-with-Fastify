import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
} from "@sequelize/core";
import sequelize from "../../../adapters/sequelizeORM";

// ───────────────────────────────────────────────────────────────── Schema ─────
class Trade extends Model {
  declare id: CreationOptional<number>;
  declare type: "buy" | "sell";
  declare user_id: number;
  declare symbol: string;
  declare shares: number;
  declare price: number; // float with 2 decimal
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Trade.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shares: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
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
    tableName: "trades",
    sequelize, // passing the `sequelize` instance is required
  }
);

export default Trade;
