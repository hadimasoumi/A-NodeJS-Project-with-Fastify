import sequelize from "./sequelizeORM";
import "../entities/schemas";

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("MariaDB has connected 🎉");
  })
  .catch((err) => {
    console.log("**** error [MariaDB] : ", err);
  });
