"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trade_controller_1 = __importDefault(require("../controllers/trade.controller"));
const response_handler_1 = __importDefault(require("../core/helper/response.handler"));
class TradeRoutes {
    constructor() {
        this.prefix_route = "/trades";
    }
    async routes(fastify, options, done) {
        fastify.get(`/`, async (request, reply) => {
            (0, response_handler_1.default)(async () => {
                const data = await trade_controller_1.default.findAllTrades();
                return data;
            }, reply);
            await reply;
        });
        fastify.get(`/:symbol`, async (request, reply) => {
            const params = request.params;
            const queryParams = request.query;
            (0, response_handler_1.default)(async () => {
                const data = await trade_controller_1.default.findTradesBySymbol(params.symbol, queryParams.start, queryParams.end);
                return data;
            }, reply);
            await reply;
        });
        fastify.post(`/`, async (request, reply) => {
            (0, response_handler_1.default)(async () => {
                const reqCreate = request.body;
                console.log(reqCreate);
                const data = await trade_controller_1.default.createTrade(reqCreate);
                return data;
            }, reply, 201);
            await reply;
        });
        fastify.get(`/users/:UserID`, async (request, reply) => {
            (0, response_handler_1.default)(async () => {
                const params = request.params;
                const UserID = parseInt(params["UserID"], 10);
                const data = await trade_controller_1.default.getTradeByUserId(UserID);
                return data;
            }, reply, 201);
            await reply;
        });
        done();
    }
}
exports.default = TradeRoutes;
//# sourceMappingURL=trades.routes.js.map