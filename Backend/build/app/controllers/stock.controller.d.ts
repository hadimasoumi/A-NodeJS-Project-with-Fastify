import { StockUpdatePriceInterface, StockCreateInterface, StockHighLowInterface } from "../core/entities/interfaces/stock.interface";
declare function deleteAllStocks(): Promise<any>;
declare function findAllStocks(): Promise<StockHighLowInterface[]>;
declare function updateStock(reqUpdate: StockUpdatePriceInterface): Promise<string>;
declare function getStockBySymbol(symbol: string): Promise<any>;
declare function createStock(reqCreate: StockCreateInterface): Promise<string>;
declare function upsertStock(reqCreate: StockCreateInterface): Promise<any>;
declare function createStockIfNotExists(reqCreate: StockCreateInterface): Promise<any>;
declare const _default: {
    deleteAllStocks: typeof deleteAllStocks;
    findAllStocks: typeof findAllStocks;
    updateStock: typeof updateStock;
    getStockBySymbol: typeof getStockBySymbol;
    createStock: typeof createStock;
    upsertStock: typeof upsertStock;
    createStockIfNotExists: typeof createStockIfNotExists;
};
export default _default;
