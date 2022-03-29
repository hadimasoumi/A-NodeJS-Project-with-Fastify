import { FastifyInstance, FastifyPluginOptions } from "fastify";
import TradeUsecase from "../../controllers/sequelize/trade.controller";
import responseHandler from "../../helper/response.handler";
import { createTrade } from "../../entities/dtos/todo.dto";

import TradeRepository from "../../repositories/sequelize/trade.repository";

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

    done();
  }
}

export default TodoRoutes;
