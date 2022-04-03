import { StockHistoryCreateInterface } from "../core/entities/interfaces/stockHistory.interface";
declare class StockRepository {
    private static instance;
    constructor();
    static getInstance(): StockRepository;
    findAllStockHistoryByStockId(stockId: number, startDate?: string, endDate?: string): Promise<any>;
    createStockHistory(stockHistory: StockHistoryCreateInterface): Promise<any>;
}
export default StockRepository;
