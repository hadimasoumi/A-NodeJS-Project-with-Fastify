import { TradeInterface } from "../entities/interfaces/data/trade.interface";
import TradeRepository from "../repositories/trade.repository";

import { createTrade } from "../entities/dtos/todo.dto";

async function findAllTrades(): Promise<TradeInterface[]> {
  const tradeRepository = TradeRepository.getInstance();
  return await tradeRepository.findAllTrades();
}

async function createTrade(reqCreate: createTrade): Promise<string> {
  const tradeRepository = TradeRepository.getInstance();
  try {
    await tradeRepository.createTrade(reqCreate);
    return `200 : Save data is successfully`;
  } catch (err) {
    throw new Error(`400 : Save data is not successfully`);
  }
}

async function deleteAllTrades(): Promise<string> {
  const todoRepository = TradeRepository.getInstance();
  const deleteResult: number = await todoRepository.deleteAllTrades();
  if (deleteResult) {
    return `200 : Delete data is successfully`;
  } else {
    throw new Error(
      `400 : Delete data is not successfully, don't have data in Database`
    );
  }
}

export default {
  findAllTrades,
  createTrade,
  deleteAllTrades,
};
