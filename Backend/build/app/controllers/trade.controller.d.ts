import { TradeCreateRequestInterface, TradeGetResponseInterface } from "../core/entities/interfaces/trade.interface";
declare function eraseTrades(): Promise<string | void>;
declare function findAllTrades(): Promise<TradeGetResponseInterface[]>;
declare function findTradesBySymbol(symbol: string, startDate?: string, endDate?: string): Promise<TradeGetResponseInterface[]>;
declare function createTrade(reqCreate: TradeCreateRequestInterface): Promise<any>;
declare function getTradeByUserId(UserID: number): Promise<TradeGetResponseInterface>;
declare const _default: {
    findAllTrades: typeof findAllTrades;
    createTrade: typeof createTrade;
    getTradeByUserId: typeof getTradeByUserId;
    eraseTrades: typeof eraseTrades;
    findTradesBySymbol: typeof findTradesBySymbol;
};
export default _default;
