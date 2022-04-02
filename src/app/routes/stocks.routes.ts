import { FastifyInstance, FastifyPluginOptions } from "fastify";
import stockController from "../controllers/stock.controller";
import stockHistoryController from "../controllers/tradeHistory.controller";
import responseHandler from "../core/helper/response.handler";
import { StockCreateInterface } from "../core/entities/interfaces/stock.interface";
class StockRoutes {
  public prefix_route = "/stocks";

  async routes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) {
    fastify.get(`/`, async (request, reply) => {
      responseHandler(async () => {
        const data = await stockController.findAllStocks();
        return data;
      }, reply);
      await reply;
    });

    fastify.get(`/:Symbol`, async (request, reply) => {
      responseHandler(async () => {
        const params = request.params as { symbol: string };
        const symbol = params["Symbol"];
        const data = await stockHistoryController.findAllTradeHistoryBySymbol(
          symbol
        );
        return data;
      }, reply);
      await reply;
    });

    fastify.get(`/:Symbol/price/`, async (request, reply) => {
      responseHandler(async () => {
        const params = request.params as { symbol: string };
        const queryParams = request.query as {
          start: string;
          end: string;
        };
        const symbol = params["Symbol"];
        const data =
          await stockHistoryController.getHightLowPriceTradeHistoryBySymbol(
            symbol,
            queryParams.start,
            queryParams.end
          );
        return data;
      }, reply);
      await reply;
    });

    fastify.post(`/`, async (request, reply) => {
      responseHandler(async () => {
        const reqCreate: StockCreateInterface =
          request.body as StockCreateInterface;
        console.log(reqCreate);
        const data = await stockController.createStock(reqCreate);
        return data;
      }, reply);
      await reply;
    });

    done();
  }
}

export default StockRoutes;
