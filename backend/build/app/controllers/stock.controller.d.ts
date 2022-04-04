import { StockUpdatePriceInterface, StockCreateInterface, StockHighLowInterface } from "../core/entities/interfaces/stock.interface";
declare function DeleteAllStocks(): Promise<any>;
declare function GetAllStocks(): Promise<StockHighLowInterface[]>;
declare function UpdateStock(reqUpdate: StockUpdatePriceInterface): Promise<string>;
declare function GetStockBySymbol(symbol: string): Promise<any>;
declare function CreateStock(reqCreate: StockCreateInterface): Promise<string>;
declare function UpsertStock(reqCreate: StockCreateInterface): Promise<any>;
declare function CreateStockIfNotExists(reqCreate: StockCreateInterface): Promise<any>;
declare const _default: {
    DeleteAllStocks: typeof DeleteAllStocks;
    GetAllStocks: typeof GetAllStocks;
    UpdateStock: typeof UpdateStock;
    GetStockBySymbol: typeof GetStockBySymbol;
    CreateStock: typeof CreateStock;
    UpsertStock: typeof UpsertStock;
    CreateStockIfNotExists: typeof CreateStockIfNotExists;
};
export default _default;
