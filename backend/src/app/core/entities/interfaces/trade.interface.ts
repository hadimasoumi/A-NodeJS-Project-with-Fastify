import { UserInterface } from "./user.interface";

interface TradeCreateRequestInterface {
  readonly type: "buy" | "sell";
  readonly user: UserInterface;
  readonly symbol: string;
  readonly shares: number;
  readonly price: number;
  readonly id?: number;
  timestamp?: string;
}
interface TradeGetResponseInterface {
  id: number;
  type: "buy" | "sell";
  user: UserInterface;
  symbol: string;
  shares: number;
  price: number;
  timestamp: string;
}
interface TradeCreateDBInterface {
  readonly type: "buy" | "sell";
  readonly user_id: number;
  readonly stock_id: number;
  readonly shares: number;
  readonly price: number;
  readonly id?: number;
  createdAt?: string;
  updatedAt?: string;
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

export {
  TradeCreateRequestInterface,
  TradeCreateDBInterface,
  TradeGetResponseInterface,
  TradeHistoryHighLowPriceInterface,
  TradeHistoryStatsInterface,
};
