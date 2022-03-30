import { FastifyInstance, FastifyPluginOptions } from "fastify";
import UserController from "../controllers/user.controller";
import responseHandler from "../helper/response.handler";
import { UserInterface } from "../entities/interfaces/user.interface";
import userController from "../controllers/user.controller";

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

          const data = await userController.createUser(reqCreate);
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
