import { TradeHistoryCreateInterface } from "../core/entities/interfaces/tradeHistory.interface";
declare class TradeHistoryRepository {
    private static instance;
    constructor();
    static getInstance(): TradeHistoryRepository;
    deleteAllTradeHistory(): Promise<any>;
    findAllTradeHistoryByStockId(stockId: number, startDate?: string, endDate?: string): Promise<any>;
    createTradeHistory(stockHistory: TradeHistoryCreateInterface): Promise<any>;
}
export default TradeHistoryRepository;
