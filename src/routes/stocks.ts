import { FastifyInstance, FastifyPluginOptions } from "fastify";
import stockController from "../controllers/stock.controller";
import stockHistoryController from "../controllers/stockHistory.controller";
import responseHandler from "../helper/response.handler";
class TodoRoutes {
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
        const data = await stockHistoryController.findAllStockHistory(symbol);
        return data;
      }, reply);
      await reply;
    });

    fastify.get(`/:Symbol/price`, async (request, reply) => {
      responseHandler(async () => {
        const params = request.params as { symbol: string };
        const queryParams = request.query;
        console.log(" queryParams ---> ", queryParams);
        const symbol = params["Symbol"];
        // const data = await stockHistoryController.findAllStockHistory(symbol);
        return true;
      }, reply);
      await reply;
    });

    done();
  }
}

export default TodoRoutes;