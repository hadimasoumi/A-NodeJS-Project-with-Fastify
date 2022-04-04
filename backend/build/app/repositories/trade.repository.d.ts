import { TradeCreateDBInterface } from "../core/entities/interfaces/trade.interface";
declare class TradeRepository {
    private static instance;
    constructor();
    static getInstance(): TradeRepository;
    GetAllTrades(): Promise<any>;
    GetTradesBySymbol(symbol: any, startDate?: string, endDate?: string): Promise<any>;
    CreateTrade(trade: TradeCreateDBInterface): Promise<any>;
    GetTradesByUserId(id: number): Promise<any>;
    GetTradeById(id: number): Promise<any>;
    DeleteAllTrades(): Promise<any>;
    GetTradesByStockId(stockId: number, startDate?: string, endDate?: string): Promise<any>;
}
export default TradeRepository;
