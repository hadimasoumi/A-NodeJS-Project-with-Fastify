import { FastifyInstance, FastifyPluginOptions } from "fastify";

class TodoRoutes {
  public prefix_route = "/erase";

  async routes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: any
  ) {
    fastify.get(`/`, (request, reply) => {
      reply.send("erase");
    });

    done();
  }
}

export default TodoRoutes;
