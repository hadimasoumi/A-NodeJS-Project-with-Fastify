import { FastifyReply } from "fastify";
import { ResponseInterface } from "../entities/interfaces/response.interface";
import errorHandler from "./errors.handler";
import parseResponse from "./response.parser";

export const responseSender = async (
  data: ResponseInterface,
  reply: FastifyReply
): Promise<void> => {
  await errorHandler.reply(data, reply);
  reply.send(data);
};

const responseHandler = async (
  next: Function,
  reply: FastifyReply,
  code?: number
): Promise<void> => {
  try {
    const data: ResponseInterface = await next();
    reply.code(201);
    responseSender(parseResponse(data), reply);
  } catch (error) {
    responseSender(parseResponse(error), reply);
  }
};

export default responseHandler;
