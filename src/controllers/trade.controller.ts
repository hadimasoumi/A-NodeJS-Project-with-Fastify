import { CreateTradeInterface } from "../entities/interfaces/trade.interface";
import TradeRepository from "../repositories/trade.repository";
import stockController from "../controllers/stock.controller";
import stockHistoryController from "../controllers/stockHistory.controller";

async function findAllTrades() {
  const tradeRepository = TradeRepository.getInstance();
  return await tradeRepository.findAllTrades();
}

async function createTrade(reqCreate: CreateTradeInterface) {
  const tradeRepository = TradeRepository.getInstance();
  try {
    const trade = await tradeRepository.createTrade(reqCreate);
    await stockController.updateStock({
      id: reqCreate.stock_id,
      price: reqCreate.price,
    });
    const history = await stockHistoryController.createStockHistory({
      stock_id: reqCreate.stock_id,
      price: reqCreate.price,
      trade_id: trade.id,
    });
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
