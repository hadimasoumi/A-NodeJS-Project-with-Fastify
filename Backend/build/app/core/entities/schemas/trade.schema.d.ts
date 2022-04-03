import { CreationOptional, Model } from "@sequelize/core";
declare class Trade extends Model {
    id: CreationOptional<number>;
    type: "buy" | "sell";
    user_id: number;
    stock_id: number;
    shares: number;
    price: number;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}
export default Trade;
