const Sequelize = require("@sequelize/core");
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "@sequelize/core/types";
import config from "../config";

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

// class MariaDBAdapter {
//   sequelize;
//   constructor(
//     username: string,
//     password: string,
//     host: string,
//     port: number,
//     dbName: string
//   ) {
//     this.sequelize = new Sequelize(dbName, username, password, {
//       host: host,
//       port: port,
//       dialect: "mariadb",
//       dialectOptions: { connectTimeout: 1000, timezone: "Asia/Tehran" },
//       pool: {
//         connectionLimit: 2,
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000,
//       },
//       retry: {
//         match: [
//           /ETIMEDOUT/,
//           /EHOSTUNREACH/,
//           /ECONNRESET/,
//           /ECONNREFUSED/,
//           /ETIMEDOUT/,
//           /ESOCKETTIMEDOUT/,
//           /EHOSTUNREACH/,
//           /EPIPE/,
//           /EAI_AGAIN/,
//           /SequelizeConnectionError/,
//           /SequelizeConnectionRefusedError/,
//           /SequelizeHostNotFoundError/,
//           /SequelizeHostNotReachableError/,
//           /SequelizeInvalidConnectionError/,
//           /SequelizeConnectionTimedOutError/,
//         ],
//         max: 5,
//       },
//       logging: false,
//     });

//     this.sequelize
//       .sync({ force: false })
//       .then(() => {
//         this.connected();
//       })
//       .catch((err) => {
//         this.error(err);
//       });
//   }

//   private connected() {
//     console.log("MariaDB has connected 🎉");
//   }

//   private error(error: Error) {
//     console.log("**** error [MariaDB] : ", error);
//     throw error;
//   }

// }
// export default MariaDBAdapter;
