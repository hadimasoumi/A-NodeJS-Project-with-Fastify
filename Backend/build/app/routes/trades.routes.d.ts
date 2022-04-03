import { FastifyInstance, FastifyPluginOptions } from "fastify";
declare class TradeRoutes {
    prefix_route: string;
    routes(fastify: FastifyInstance, options: FastifyPluginOptions, done: any): Promise<void>;
}
export default TradeRoutes;
