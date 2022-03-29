import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
} from "@sequelize/core";
import sequelize from "../../../adapters/sequelizeORM";

// ───────────────────────────────────────────────────────────────── Schema ─────

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

class Trade extends Model<
  InferAttributes<Trade>,
  InferCreationAttributes<Trade>
> {
  declare id: CreationOptional<number>;
  declare type: "buy" | "sell";
  declare User: any;
  declare symbol: string;
  declare shares: number;
  declare price: number; // float with 2 decimal
  declare timestamp: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
  }
);
