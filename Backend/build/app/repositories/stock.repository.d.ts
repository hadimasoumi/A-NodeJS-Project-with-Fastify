import { StockUpdatePriceInterface, StockCreateInterface } from "../core/entities/interfaces/stock.interface";
declare class StockRepository {
    private static instance;
    constructor();
    static getInstance(): StockRepository;
    deleteAllStocks(): Promise<any>;
    findAllStocks(): Promise<any>;
    updateStock(stock: StockUpdatePriceInterface): Promise<any>;
    getStockBySymbol(symbol: string): Promise<any>;
    createStock(stock: any): Promise<any>;
    upsertStock(stock: any): Promise<any>;
    createStockIfNotExists: (reqCreate: StockCreateInterface) => Promise<any>;
}
export default StockRepository;
