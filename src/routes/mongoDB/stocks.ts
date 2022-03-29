import { FastifyInstance, FastifyPluginOptions } from "fastify";

class TodoRoutes {
  public prefix_route = "/stocks";

  async routes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) {
    fastify.get(`/`, (request, reply) => {
      reply.send("stocks");
    });

    done();
  }
}

export default TodoRoutes;
