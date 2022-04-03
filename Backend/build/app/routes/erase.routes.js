"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trade_controller_1 = __importDefault(require("../controllers/trade.controller"));
const response_handler_1 = __importDefault(require("../core/helper/response.handler"));
class EraseRoutes {
    constructor() {
        this.prefix_route = "/erase";
    }
    async routes(fastify, options, done) {
        fastify.delete(`/`, async (request, reply) => {
            (0, response_handler_1.default)(async () => {
                const data = await trade_controller_1.default.eraseTrades();
                return data;
            }, reply);
            await reply;
        });
        done();
    }
}
exports.default = EraseRoutes;
//# sourceMappingURL=erase.routes.js.map