import { FastifyInstance, FastifyPluginOptions } from "fastify";
import TradeUsecase from "../../controllers/mongoose/trade.usecase";
import responseHandler from "../../helper/response.handler";
import { createTrade } from "../../entities/dtos/todo.dto";

class TodoRoutes {
  public prefix_route = "/trades";

  async routes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) {
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

    fastify.get(`/`, async (request, reply) => {
      responseHandler(async () => {
        const data = await TradeUsecase.findAllTrades();
        return data;
      }, reply);
      await reply;
    });

    fastify.delete(
      `/erase`,
      // { preValidation: [(fastify as any).authenticate] },
      async (request, reply) => {
        responseHandler(async () => {
          // console.log(request.user);
          const data = await TradeUsecase.deleteAllTrades();
          return data;
        }, reply);
        await reply;
      }
    );

    done();
  }
}

export default TodoRoutes;
