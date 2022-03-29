import * as mongoose from "mongoose";

export const TradeSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    type: { type: String, required: true },
    user: { type: JSON, required: true },
    symbol: { type: String, required: true },
    shares: { type: Number, required: true },
    price: { type: Number, required: true },
    timestamp: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
