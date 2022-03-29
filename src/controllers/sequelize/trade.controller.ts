import { TradeInterface } from "../../entities/interfaces/mongoose/trade.interface";
import TradeRepository from "../../repositories/sequelize/trade.repository";

import { createTrade } from "../../entities/dtos/todo.dto";

async function findAllTrades() {
  const tradeRepository = TradeRepository.getInstance();
  return await tradeRepository.findAllTrades();
}

async function createTrade(reqCreate: createTrade) {
  const tradeRepository = TradeRepository.getInstance();
  try {
    await tradeRepository.createTrade(reqCreate);
    return `200 : Save data is successfully`;
  } catch (err) {
    throw new Error(`400 : Save data is not successfully`);
  }
}

async function getTradeByUserId(UserID: number) {
  const tradeRepository = TradeRepository.getInstance();
  try {
    return await tradeRepository.getTradeByUserId(UserID);
  } catch (err) {
    throw new Error(`400 : Save data is not successfully`);
  }
}

// async function deleteAllTrades(): Promise<string> {
//   const todoRepository = TradeRepository.getInstance();
//   const deleteResult: number = await todoRepository.deleteAllTrades();
//   if (deleteResult) {
//     return `200 : Delete data is successfully`;
//   } else {
//     throw new Error(
//       `400 : Delete data is not successfully, don't have data in Database`
//     );
//   }
// }

export default {
  findAllTrades,
  createTrade,
  getTradeByUserId,
  // deleteAllTrades,
};
