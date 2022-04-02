import { FastifyInstance, FastifyPluginOptions } from "fastify";
import TradeController from "../controllers/trade.controller";
import responseHandler from "../core/helper/response.handler";
import { TradeCreateRequestInterface } from "../core/entities/interfaces/trade.interface";

class TradeRoutes {
  public prefix_route = "/trades";

  async routes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) {
    fastify.get(`/`, async (request, reply) => {
      responseHandler(async () => {
        const data = await TradeController.findAllTrades();

        return data;
      }, reply);
      await reply;
    });

    fastify.get(`/:symbol`, async (request, reply) => {
      const params = request.params as { symbol: string };
      const queryParams = request.query as {
        start: string;
        end: string;
      };
      responseHandler(async () => {
        const data = await TradeController.findTradesBySymbol(
          params.symbol,
          queryParams.start,
          queryParams.end
        );

        return data;
      }, reply);
      await reply;
    });

    fastify.post(`/`, async (request, reply) => {
      responseHandler(
        async () => {
          const reqCreate: TradeCreateRequestInterface =
            request.body as TradeCreateRequestInterface;
          console.log(reqCreate);

          const data = await TradeController.createTrade(reqCreate);
          return data;
        },
        reply,
        201
      );
      await reply;
    });

    fastify.get(`/users/:UserID`, async (request, reply) => {
      responseHandler(
        async () => {
          const params = request.params as { UserID: string };
          const UserID = parseInt(params["UserID"], 10);
          const data = await TradeController.getTradeByUserId(UserID);
          return data;
        },
        reply,
        201
      );
      await reply;
    });

    done();
  }
}

export default TradeRoutes;
