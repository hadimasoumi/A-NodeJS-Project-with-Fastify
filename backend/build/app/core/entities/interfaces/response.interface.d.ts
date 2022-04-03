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
export declare type ResponseInterface = String | Error | SuccessInterface | ErrorInterface | UserInterface | TradeCreateRequestInterface;
export {};
