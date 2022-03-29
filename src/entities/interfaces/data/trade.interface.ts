import { Document } from "mongoose";

interface TradeDocument extends Document {
  readonly id: string;
  readonly task_name: string;
  readonly task_content: string;
}

type TradeInterface = TradeDocument;

export { TradeInterface };
