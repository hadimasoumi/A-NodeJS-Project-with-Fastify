import { FastifyInstance, FastifyPluginOptions } from "fastify";

class TodoRoutes {
  public prefix_route = "/trades";

  async routes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) {
    fastify.get(`/`, (request, reply) => {
      reply.send("trades");
    });

    done();
  }
}

export default TodoRoutes;
