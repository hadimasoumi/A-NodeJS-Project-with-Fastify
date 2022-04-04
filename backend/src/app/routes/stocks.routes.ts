import { FastifyInstance, FastifyPluginOptions } from "fastify";
import stockController from "../controllers/stock.controller";
import TradeController from "../controllers/trade.controller";
import responseHandler from "../core/helper/response.handler";
import { StockCreateInterface } from "../core/entities/interfaces/stock.interface";
class StockRoutes {
  public prefix_route = "/stocks";

  async routes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) {
    // Get highest and lowest price by symbol
    fastify.get(`/:Symbol/price/`, async (request, reply) => {
      responseHandler(async () => {
        const params = request.params as { symbol: string };
        const queryParams = request.query as {
          start: string;
          end: string;
        };
        const symbol = params["Symbol"];
        const data = await TradeController.GetStockHightLowPriceBySymbol(
          symbol,
          queryParams.start,
          queryParams.end
        );
        return data;
      }, reply);
      await reply;
    });

    // Get stats of all stocks
    fastify.get(`/stats`, async (request, reply) => {
      responseHandler(async () => {
        const queryParams = request.query as {
          start: string;
          end: string;
        };
        const data = await TradeController.GetStocksStats(
          queryParams.start,
          queryParams.end
        );
        return data;
      }, reply);
      await reply;
    });

    fastify.get(`/statsWithPrices`, async (request, reply) => {
      responseHandler(async () => {
        const queryParams = request.query as {
          start: string;
          end: string;
        };
        const data = await TradeController.GetStocksStatsWithPrices(
          queryParams.start,
          queryParams.end
        );
        return data;
      }, reply);
      await reply;
    });

    // Get stats by symbol
    fastify.get(`/stats/:symbol`, async (request, reply) => {
      responseHandler(async () => {
        const params = request.params as { symbol: string };
        const queryParams = request.query as {
          start: string;
          end: string;
        };
        const data = await TradeController.GetStockStatsBySymbol(
          params.symbol,
          queryParams.start,
          queryParams.end
        );
        return data;
      }, reply);
      await reply;
    });

    // Get all stocks
    fastify.get(`/`, async (request, reply) => {
      responseHandler(async () => {
        const data = await stockController.GetAllStocks();
        return data;
      }, reply);
      await reply;
    });

    // Create new stock
    fastify.post(`/`, async (request, reply) => {
      responseHandler(async () => {
        const reqCreate: StockCreateInterface =
          request.body as StockCreateInterface;
        console.log(reqCreate);
        const data = await stockController.CreateStock(reqCreate);
        return data;
      }, reply);
      await reply;
    });
    done();
  }
}

export default StockRoutes;
