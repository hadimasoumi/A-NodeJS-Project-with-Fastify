import { ResponseInterface } from "../entities/interfaces/response.interface";
import { FastifyReply } from "fastify";
declare const _default: {
    reply: (replyponseData: ResponseInterface, reply: FastifyReply<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown>) => Promise<void>;
};
export default _default;
