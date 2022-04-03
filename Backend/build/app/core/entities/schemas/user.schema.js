"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const sequelizeORM_1 = __importDefault(require("../../adapters/sequelizeORM"));
class User extends core_1.Model {
}
User.init({
    id: {
        type: core_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new core_1.DataTypes.STRING(50),
        allowNull: false,
    },
    createdAt: {
        type: core_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: core_1.DataTypes.DATE,
    },
}, {
    tableName: "users",
    sequelize: sequelizeORM_1.default,
});
exports.default = User;
//# sourceMappingURL=user.schema.js.map