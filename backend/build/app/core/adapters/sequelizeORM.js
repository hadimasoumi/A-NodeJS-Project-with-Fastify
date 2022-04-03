"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("@sequelize/core");
const env_1 = __importDefault(require("../../../env"));
const username = env_1.default.db.mariaDB.username;
const password = env_1.default.db.mariaDB.password;
const host = env_1.default.db.mariaDB.host;
const port = (_a = parseInt(`${env_1.default.db.mariaDB.port}`, 10)) !== null && _a !== void 0 ? _a : 3306;
const dbName = env_1.default.db.mariaDB.name;
const sequelize = new Sequelize(dbName, username, password, {
    host: host,
    port: port,
    dialect: "mariadb",
    dialectOptions: { connectTimeout: 1000, timezone: "Asia/Tehran" },
    pool: {
        connectionLimit: 2,
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    retry: {
        match: [
            /ETIMEDOUT/,
            /EHOSTUNREACH/,
            /ECONNRESET/,
            /ECONNREFUSED/,
            /ETIMEDOUT/,
            /ESOCKETTIMEDOUT/,
            /EHOSTUNREACH/,
            /EPIPE/,
            /EAI_AGAIN/,
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/,
        ],
        max: 5,
    },
    logging: false,
});
exports.default = sequelize;
//# sourceMappingURL=sequelizeORM.js.map