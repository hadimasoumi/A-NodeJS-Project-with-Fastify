import { TradeCreateDBInterface } from "../core/entities/interfaces/trade.interface";
declare class TradeRepository {
    private static instance;
    constructor();
    static getInstance(): TradeRepository;
    findAllTrades(): Promise<any>;
    findTradesBySymbol(symbol: any, startDate?: string, endDate?: string): Promise<any>;
    createTrade(trade: TradeCreateDBInterface): Promise<any>;
    getTradeByUserId(id: number): Promise<any>;
    getTradeById(id: number): Promise<any>;
    deleteAllTrades(): Promise<any>;
}
export default TradeRepository;
