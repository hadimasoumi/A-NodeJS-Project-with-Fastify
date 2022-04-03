import { TradeHistoryCreateInterface, TradeHistoryStatsInterface } from "../core/entities/interfaces/tradeHistory.interface";
declare function deleteAllTradeHistory(): Promise<any>;
declare function findAllTradeHistoryBySymbol(symbol: string, startDate?: string, endDate?: string): Promise<any>;
declare function getHightLowPriceTradeHistoryBySymbol(symbol: string, startDate?: string, endDate?: string): Promise<any>;
declare function getStockStatsBySymbol(symbol: string, startDate?: string, endDate?: string): Promise<void | TradeHistoryStatsInterface>;
declare function getStocksStats(startDate?: string, endDate?: string): Promise<any>;
declare function createTradeHistory(reqCreate: TradeHistoryCreateInterface): Promise<any>;
declare const _default: {
    deleteAllTradeHistory: typeof deleteAllTradeHistory;
    findAllTradeHistoryBySymbol: typeof findAllTradeHistoryBySymbol;
    createTradeHistory: typeof createTradeHistory;
    getHightLowPriceTradeHistoryBySymbol: typeof getHightLowPriceTradeHistoryBySymbol;
    getStocksStats: typeof getStocksStats;
    getStockStatsBySymbol: typeof getStockStatsBySymbol;
};
export default _default;
