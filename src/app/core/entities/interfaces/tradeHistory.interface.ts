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

export { TradeHistoryCreateInterface, TradeHistoryHighLowPriceInterface };
