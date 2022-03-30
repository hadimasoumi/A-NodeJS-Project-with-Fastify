import { UserInterface } from "./user.interface";
import { TradeCreateRequestInterface } from "./trade.interface";
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
  | TradeCreateRequestInterface;

// import { UserInterface } from "./user.interface";
// import { TradeCreateRequestInterface } from "./trade.interface";
// export interface ResponseDataInterface {
//   data: {
//     status;
//     status_code: number;
//     message: string;
//     error: any;
//   };
// }

// export type ResponseInterface =
//   | String
//   | Error
//   | ResponseDataInterface
//   | UserInterface
//   | TradeCreateRequestInterface;
