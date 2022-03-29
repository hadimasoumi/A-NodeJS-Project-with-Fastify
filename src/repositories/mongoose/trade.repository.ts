import { model, Model, Mongoose } from "mongoose";
import { TradeInterface } from "../../entities/interfaces/mongoose/trade.interface";
import { TradeSchema } from "../../entities/schemas/mongoose/trade.schema";
import { createTrade } from "../../entities/dtos/todo.dto";

import config from "../../config";

class TradeRepository {
  private static instance: TradeRepository;
  private _model: Model<TradeInterface>;
  private _collection: string;

  constructor() {
    this._collection = config.db.mongo.collection!;
    this._model = model<TradeInterface>(this._collection, TradeSchema);
  }

  public static getInstance(): TradeRepository {
    if (!TradeRepository.instance) {
      TradeRepository.instance = new TradeRepository();
    }
    return TradeRepository.instance;
  }

  public async findAllTrades(): Promise<TradeInterface[]> {
    const result = await this._model.find({});
    return result as TradeInterface[];
  }

  public async findTeadeById(id: string): Promise<TradeInterface | null> {
    const result: TradeInterface = (await this._model.findOne({ id }))!;
    return result;
  }

  public async createTrade(trade: createTrade): Promise<string> {
    const mongooseModel = new this._model(trade);
    const result = await mongooseModel.save();
    return result.id as string;
  }

  // public async deleteTodo(_id: string): Promise<number> {
  //   const result = await this._model.deleteOne({ _id });
  //   return result.deletedCount as number;
  // }

  public async deleteAllTrades(): Promise<number> {
    const result = await this._model.deleteMany();
    return result.deletedCount as number;
  }
}

export default TradeRepository;
