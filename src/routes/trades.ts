import { FastifyInstance, FastifyPluginOptions } from "fastify";
import TradeUsecase from "../controllers/trade.controller";
import responseHandler from "../helper/response.handler";
import { createTrade } from "../entities/dtos/todo.dto";

class TodoRoutes {
  public prefix_route = "/trades";

  async routes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) {
    fastify.get(`/`, async (request, reply) => {
      responseHandler(async () => {
        const data = await TradeUsecase.findAllTrades();

        return data;
      }, reply);
      await reply;
    });

    fastify.post(`/create`, async (request, reply) => {
      responseHandler(
        async () => {
          const reqCreate: createTrade = request.body as createTrade;
          console.log(reqCreate);

          const data = await TradeUsecase.createTrade(reqCreate);
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
          const data = await TradeUsecase.getTradeByUserId(UserID);
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

export default TodoRoutes;
