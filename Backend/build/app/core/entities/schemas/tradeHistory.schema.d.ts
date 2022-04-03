import { CreationOptional, Model } from "@sequelize/core";
declare class TradeHistory extends Model {
    id: CreationOptional<number>;
    symbol: string;
    price: number;
    trade_id: number;
    stock_id: number;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}
export default TradeHistory;
