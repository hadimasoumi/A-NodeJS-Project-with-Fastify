interface TradeHistoryCreateInterface {
    readonly price: number;
    readonly trade_id: number;
    readonly stock_id: number;
}
interface TradeHistoryHighLowPriceInterface {
    symbol: string;
    highest: number;
    lowest: number;
}
interface TradeHistoryStatsInterface {
    stock: string;
    fluctuations?: number;
    max_rise?: number;
    max_fall?: number;
    message?: string;
    prices?: Array<number>;
}
export { TradeHistoryCreateInterface, TradeHistoryHighLowPriceInterface, TradeHistoryStatsInterface, };
