import { StockHistoryCreateInterface } from "../core/entities/interfaces/stockHistory.interface";
declare function findAllStockHistoryBySymbol(symbol: string, startDate?: string, endDate?: string): Promise<any>;
declare function createStockHistory(reqCreate: StockHistoryCreateInterface): Promise<any>;
declare const _default: {
    findAllStockHistoryBySymbol: typeof findAllStockHistoryBySymbol;
    createStockHistory: typeof createStockHistory;
};
export default _default;
