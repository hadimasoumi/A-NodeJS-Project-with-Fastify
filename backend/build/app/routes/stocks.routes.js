"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stock_controller_1 = __importDefault(require("../controllers/stock.controller"));
const trade_controller_1 = __importDefault(require("../controllers/trade.controller"));
const response_handler_1 = __importDefault(require("../core/helper/response.handler"));
class StockRoutes {
    constructor() {
        this.prefix_route = "/stocks";
    }
    async routes(fastify, options, done) {
        fastify.get(`/:Symbol/price/`, async (request, reply) => {
            (0, response_handler_1.default)(async () => {
                const params = request.params;
                const queryParams = request.query;
                const symbol = params["Symbol"];
                const data = await trade_controller_1.default.GetStockHightLowPriceBySymbol(symbol, queryParams.start, queryParams.end);
                return data;
            }, reply);
            await reply;
        });
        fastify.get(`/stats`, async (request, reply) => {
            (0, response_handler_1.default)(async () => {
                const queryParams = request.query;
                const data = await trade_controller_1.default.GetStocksStats(queryParams.start, queryParams.end);
                return data;
            }, reply);
            await reply;
        });
        fastify.get(`/stats/:symbol`, async (request, reply) => {
            (0, response_handler_1.default)(async () => {
                const params = request.params;
                const queryParams = request.query;
                const data = await trade_controller_1.default.GetStockStatsBySymbol(params.symbol, queryParams.start, queryParams.end);
                return data;
            }, reply);
            await reply;
        });
        fastify.get(`/`, async (request, reply) => {
            (0, response_handler_1.default)(async () => {
                const data = await stock_controller_1.default.GetAllStocks();
                return data;
            }, reply);
            await reply;
        });
        fastify.post(`/`, async (request, reply) => {
            (0, response_handler_1.default)(async () => {
                const reqCreate = request.body;
                console.log(reqCreate);
                const data = await stock_controller_1.default.CreateStock(reqCreate);
                return data;
            }, reply);
            await reply;
        });
        done();
    }
}
exports.default = StockRoutes;
//# sourceMappingURL=stocks.routes.js.map