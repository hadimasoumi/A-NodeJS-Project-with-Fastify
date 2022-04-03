import { FastifyReply } from "fastify";
import { ResponseInterface } from "../entities/interfaces/response.interface";
import errorHandler from "./errors.handler";
import parseResponse from "./response.parser";

export const responseSender = async (
  data: ResponseInterface,
  reply: FastifyReply
): Promise<void> => {
  // console.log("data >> ", data);
  if (data) {
    if ("success" in data) {
      reply
        .header("Content-Type", "application/json;charset=utf-8")
        .code(data.success.code);
    } else {
      await errorHandler.reply(data, reply);
    }
  } else
    throw new Error(
      "500 : error ocuured in response.handler. data is not in correct way"
    );
  reply.send(data);
};

const responseHandler = async (
  next: Function,
  reply: FastifyReply,
  code?: number
): Promise<void> => {
  try {
    const data: ResponseInterface = await next();
    responseSender(parseResponse(data), reply);
  } catch (error) {
    responseSender(parseResponse(error as Error), reply);
  }
};

export default responseHandler;
