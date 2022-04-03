import { FastifyInstance, FastifyPluginOptions } from "fastify";
import TradeController from "../controllers/trade.controller";
import responseHandler from "../core/helper/response.handler";
class EraseRoutes {
  public prefix_route = "/erase";

  async routes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) {
    fastify.delete(`/`, async (request, reply) => {
      responseHandler(async () => {
        const data = await TradeController.eraseTrades();

        return data;
      }, reply);
      await reply;
    });

    done();
  }
}

export default EraseRoutes;
