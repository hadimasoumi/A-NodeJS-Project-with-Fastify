import { Document } from "mongoose";

interface TradeDocument extends Document {
  readonly id: number;
  readonly task_name: string;
  readonly task_content: string;
  readonly type: "buy";
  readonly user: any;
  readonly symbol: string;
  readonly shares: number;
  readonly price: number;
  readonly timestamp: string;
}

type TradeInterface = TradeDocument;

export { TradeInterface };
