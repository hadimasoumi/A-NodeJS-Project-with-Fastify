import { FastifyInstance, FastifyPluginOptions } from "fastify";
declare class StockRoutes {
    prefix_route: string;
    routes(fastify: FastifyInstance, options: FastifyPluginOptions, done: any): Promise<void>;
}
export default StockRoutes;
