import { FastifyInstance, FastifyPluginOptions } from "fastify";
import UserController from "../controllers/user.controller";
import responseHandler from "../core/helper/response.handler";
import { UserInterface } from "../core/entities/interfaces/user.interface";

class TradeRoutes {
  public prefix_route = "/users";

  async routes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) {
    // fastify.get(`/`, async (request, reply) => {
    //   responseHandler(async () => {
    //     const data = await UserController.findAllTrades();

    //     return data;
    //   }, reply);
    //   await reply;
    // });

    fastify.post(`/create`, async (request, reply) => {
      responseHandler(
        async () => {
          const reqCreate: UserInterface = request.body as UserInterface;
          console.log(reqCreate);

          const data = await UserController.CreateUser(reqCreate);
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
