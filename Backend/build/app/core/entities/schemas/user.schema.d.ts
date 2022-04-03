import { CreationOptional, Model } from "@sequelize/core";
declare class User extends Model {
    id: number;
    name: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}
export default User;
