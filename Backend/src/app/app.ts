import fastify, { FastifyInstance } from "fastify";
import fastifyCors, { FastifyCorsOptions } from "fastify-cors";
import config from "../env";
import "./core/adapters/mariadb.adapter";

class App {
  public app: FastifyInstance;
  public app_domain: string = config.app.domain;
  public app_port: number = parseInt(`${config.app.port}`, 10) ?? 8080;

  constructor(appInit: { plugins: any; routes: any }) {
    this.app = fastify({ logger: true });
    this.app.register(fastifyCors, { origin: "*" });
    this.routes(appInit.routes);
  }

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
