import { UserInterface } from "../mongoose/user.interface";
import { TradeInterface } from "../mongoose/trade.interface";
interface dataInterface {
  code: number;
  message: string;
}

export interface SuccessInterface {
  success: dataInterface;
}

export interface ErrorInterface {
  error: dataInterface;
}

export type ResponseInterface =
  | String
  | Error
  | SuccessInterface
  | ErrorInterface
  | UserInterface
  | TradeInterface;
