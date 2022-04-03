const Sequelize = require("@sequelize/core");
import config from "../../../env";

const username = config.db.mariaDB.username!;
const password = config.db.mariaDB.password!;
const host = config.db.mariaDB.host!;
const port = parseInt(`${config.db.mariaDB.port}`, 10) ?? 3306;
const dbName = config.db.mariaDB.name!;

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

export default sequelize;
