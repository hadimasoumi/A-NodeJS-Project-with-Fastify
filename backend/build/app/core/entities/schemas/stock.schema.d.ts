import { CreationOptional, Model } from "@sequelize/core";
declare class Stock extends Model {
    id: CreationOptional<number>;
    symbol: string;
    name: string;
    price: number;
    total_shares: number;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}
export default Stock;
