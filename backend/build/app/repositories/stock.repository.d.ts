import { StockUpdatePriceInterface, StockCreateInterface } from "../core/entities/interfaces/stock.interface";
declare class StockRepository {
    private static instance;
    constructor();
    static getInstance(): StockRepository;
    DeleteAllStocks(): Promise<any>;
    GetAllStocks(): Promise<any>;
    UpdateStock(stock: StockUpdatePriceInterface): Promise<any>;
    GetStockBySymbol(symbol: string): Promise<any>;
    CreateStock(stock: any): Promise<any>;
    UpsertStock(stock: any): Promise<any>;
    createStockIfNotExists: (reqCreate: StockCreateInterface) => Promise<any>;
}
export default StockRepository;
