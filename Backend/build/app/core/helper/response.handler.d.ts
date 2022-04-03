import { FastifyReply } from "fastify";
import { ResponseInterface } from "../entities/interfaces/response.interface";
export declare const responseSender: (data: ResponseInterface, reply: FastifyReply) => Promise<void>;
declare const responseHandler: (next: Function, reply: FastifyReply, code?: number | undefined) => Promise<void>;
export default responseHandler;
