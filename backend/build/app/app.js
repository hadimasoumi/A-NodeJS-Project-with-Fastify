"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_cors_1 = __importDefault(require("fastify-cors"));
const env_1 = __importDefault(require("../env"));
require("./core/adapters/mariadb.adapter");
class App {
    constructor(appInit) {
        var _a;
        this.app_domain = env_1.default.app.domain;
        this.app_port = (_a = parseInt(`${env_1.default.app.port}`, 10)) !== null && _a !== void 0 ? _a : 8080;
        this.app = (0, fastify_1.default)({ logger: true });
        this.app.register(fastify_cors_1.default, { origin: "*" });
        this.routes(appInit.routes);
    }
    routes(routes) {
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
    listen() {
        this.app.listen(this.app_port, () => {
            console.log(`App listening on the http://${this.app_domain}:${this.app_port} 🌟👻`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map