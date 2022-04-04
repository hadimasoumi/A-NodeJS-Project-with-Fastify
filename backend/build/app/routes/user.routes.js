"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const response_handler_1 = __importDefault(require("../core/helper/response.handler"));
class TradeRoutes {
    constructor() {
        this.prefix_route = "/users";
    }
    async routes(fastify, options, done) {
        fastify.post(`/create`, async (request, reply) => {
            (0, response_handler_1.default)(async () => {
                const reqCreate = request.body;
                console.log(reqCreate);
                const data = await user_controller_1.default.CreateUser(reqCreate);
                return data;
            }, reply, 201);
            await reply;
        });
        done();
    }
}
exports.default = TradeRoutes;
//# sourceMappingURL=user.routes.js.map