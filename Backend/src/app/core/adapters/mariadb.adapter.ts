import sequelize from "./sequelizeORM";
import "../entities/schemas";

// import tunnel from "tunnel-ssh";
// // initiate tunnel

// var config = {
//   user: "hadimasu",
//   host: "sshhost",
//   port: 22,
//   dsthost: "http://demo.savy.ir:2083",
//   dstport: 7854,
//   srchost: "http://demo.savy.ir:2083",
//   srcport: 7854,
//   localhost: "http://demo.savy.ir:2083",
//   localport: 7854,
//   // privatekey: require("fs").readfilesync("/path/to/key"),
// };

// tunnel(config, function (error, server) {
//   //....
//   if (error) {
//     console.error(error);
//   } else {
//     console.log("server:", server);
//     // test sequelize connection
//     sequelize
//       .authenticate()
//       .then(function (err) {
//         console.log("connection established");
//       })
//       .catch(function (err) {
//         console.error("unable establish connection", err);
//       });
//   }
// });

sequelize
  .sync({ force: false })
  .then(() => {
    // console.log("MariaDB has connected 🎉");
  })
  .catch((err) => {
    // console.log("**** error [MariaDB] : ", err);
  });
