"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stock_controller_1 = __importDefault(require("../controllers/stock.controller"));
const tradeHistory_controller_1 = __importDefault(require("../controllers/tradeHistory.controller"));
const response_handler_1 = __importDefault(require("../core/helper/response.handler"));
class StockRoutes {
    constructor() {
        this.prefix_route = "/stocks";
    }
    async routes(fastify, options, done) {
        fastify.get(`/`, async (request, reply) => {
            (0, response_handler_1.default)(async () => {
                const data = await stock_controller_1.default.findAllStocks();
                return data;
            }, reply);
            await reply;
        });
        fastify.post(`/`, async (request, reply) => {
            (0, response_handler_1.default)(async () => {
                const reqCreate = request.body;
                console.log(reqCreate);
                const data = await stock_controller_1.default.createStock(reqCreate);
                return data;
            }, reply);
            await reply;
        });
        fastify.get(`/history/:Symbol`, async (request, reply) => {
            (0, response_handler_1.default)(async () => {
                const params = request.params;
                const symbol = params["Symbol"];
                const data = await tradeHistory_controller_1.default.findAllTradeHistoryBySymbol(symbol);
                return data;
            }, reply);
            await reply;
        });
        fastify.get(`/:Symbol/price/`, async (request, reply) => {
            (0, response_handler_1.default)(async () => {
                const params = request.params;
                const queryParams = request.query;
                const symbol = params["Symbol"];
                const data = await tradeHistory_controller_1.default.getHightLowPriceTradeHistoryBySymbol(symbol, queryParams.start, queryParams.end);
                return data;
            }, reply);
            await reply;
        });
        fastify.get(`/stats`, async (request, reply) => {
            (0, response_handler_1.default)(async () => {
                const queryParams = request.query;
                const data = await tradeHistory_controller_1.default.getStocksStats(queryParams.start, queryParams.end);
                return data;
            }, reply);
            await reply;
        });
        fastify.get(`/stats/:symbol`, async (request, reply) => {
            (0, response_handler_1.default)(async () => {
                const params = request.params;
                const queryParams = request.query;
                const data = await tradeHistory_controller_1.default.getStockStatsBySymbol(params.symbol, queryParams.start, queryParams.end);
                return data;
            }, reply);
            await reply;
        });
        done();
    }
}
exports.default = StockRoutes;
//# sourceMappingURL=stocks.routes.js.map