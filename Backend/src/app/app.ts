import fastify, { FastifyInstance } from "fastify";
import config from "../env";
// import MongoAdapter from "./adapters/mongo.adapter";
import "./core/adapters/mariadb.adapter";

class App {
  public app: FastifyInstance;
  public app_domain: string = config.app.domain;
  public app_port: number = parseInt(`${config.app.port}`, 10) ?? 8080;

  // private mongoDatabaseInfo = {
  //   username: config.db.mongo.username!,
  //   password: config.db.mongo.password!,
  //   host: config.db.mongo.host!,
  //   port: parseInt(`${config.db.mongo.port}`, 10) ?? 27017,
  //   dbName: config.db.mongo.name!,
  //   authName: config.db.mongo.auth!,
  // };

  // private mariaDBDatabaseInfo = {
  //   username: config.db.mariaDB.username!,
  //   password: config.db.mariaDB.password!,
  //   host: config.db.mariaDB.host!,
  //   port: parseInt(`${config.db.mariaDB.port}`, 10) ?? 3306,
  //   dbName: config.db.mariaDB.name!,
  // };

  constructor(appInit: { plugins: any; routes: any }) {
    this.app = fastify({ logger: true });

    // this.connectMongo();
    // this.connectMariaDB();
    this.routes(appInit.routes);
  }

  // private async connectMongo() {
  //   let { username, password, host, port, dbName, authName } =
  //     this.mongoDatabaseInfo;
  //   await new MongoAdapter(username, password, host, port, dbName, authName);
  // }

  // private async connectMariaDB() {
  //   let { username, password, host, port, dbName } = this.mariaDBDatabaseInfo;
  //   await new MariaDBAdapter(username, password, host, port, dbName);
  // }

  public routes(routes: { forEach: (arg0: (routes: any) => void) => void }) {
    routes.forEach((route) => {
      let router = new route();
      this.app.register(router.routes, { prefix: router.prefix_route });
    });

    this.app.get(`/`, (request, reply) => {
      reply.send({ healthcheck: "server is alive" });
    });

    this.app.get("/healthcheck", async (request, reply) => {
      reply.send({ healthcheck: "server is alive" });
    });
  }

  public listen() {
    this.app.listen(this.app_port, () => {
      console.log(
        `App listening on the http://${this.app_domain}:${this.app_port} 🌟👻`
      );
    });
  }
}

export default App;
