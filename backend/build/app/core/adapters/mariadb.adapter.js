"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelizeORM_1 = __importDefault(require("./sequelizeORM"));
require("../entities/schemas");
sequelizeORM_1.default.sync({ force: false });
//# sourceMappingURL=mariadb.adapter.js.map