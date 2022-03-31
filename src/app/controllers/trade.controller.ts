import moment from "moment";
import {
  TradeCreateRequestInterface,
  TradeCreateDBInterface,
  TradeGetResponseInterface,
} from "../core/entities/interfaces/trade.interface";
import { StockInterface } from "../core/entities/interfaces/stock.interface";
import { UserInterface } from "../core/entities/interfaces/user.interface";
import TradeRepository from "../repositories/trade.repository";
import stockController from "./stock.controller";
import stockHistoryController from "./stockHistory.controller";
import userController from "./user.controller";

async function findAllTrades() {
  const tradeRepository = TradeRepository.getInstance();
  return tradeRepository
    .findAllTrades()
    .then((trades) => {
      let res: TradeGetResponseInterface[] = [];
      for (const trade of trades) {
        res.push({
          id: trade.id,
          type: trade.type,
          symbol: trade.Stock.symbol,
          shares: trade.shares,
          price: trade.price,
          timestamp: moment(trade.createdAt).format("yyyy-MM-DD HH:mm:ss"),
          user: trade.User,
        });
      }
      return res;
    })
    .catch((error) => {
      throw new Error(`400 : in getAllTrades ` + error);
    });
}

async function createTrade(reqCreate: TradeCreateRequestInterface) {
  const tradeRepository = TradeRepository.getInstance();
  let finalresult: any;

  // TODO: add validator for reqBody
  if (reqCreate != undefined && reqCreate != null && reqCreate.symbol) {
    if (reqCreate.id) {
      const res = await tradeRepository.getTradeById(reqCreate.id);
      if (res.length > 0) {
        throw new Error(`400 : Record already exists`);
      }
    }
    const stock: StockInterface = await stockController.createStockIfNotExists({
      symbol: reqCreate.symbol,
    });
    console.log("stock ---> ", stock);
    const user = await userController.getUserById(reqCreate.user.id);
    if (user.length == 0) {
      await userController.createUser(reqCreate.user);
    }

    let reqCreateDB: TradeCreateDBInterface = {
      id: reqCreate.id,
      user_id: reqCreate.user.id,
      stock_id: stock.id,
      price: reqCreate.price,
      shares: reqCreate.shares,
      type: reqCreate.type,
    };

    if (reqCreate.timestamp != undefined) {
      reqCreateDB.createdAt = reqCreate.timestamp;
      reqCreateDB.updatedAt = reqCreate.timestamp;
    }

    await tradeRepository
      .createTrade(reqCreateDB)
      .then(async (result) => {
        await stockController
          .updateStock({
            id: reqCreateDB.stock_id,
            price: reqCreate.price,
          })
          .then(() => {
            stockHistoryController.createStockHistory({
              stock_id: reqCreateDB.stock_id,
              price: reqCreate.price,
              trade_id: result.dataValues.id,
            });

            finalresult = `201 : Save data is successfully`;
          });
      })
      .catch((error) => {
        console.log("error in tradeHandler -> createTrade ---> ", error);
        throw new Error("400 : " + error);
      });
  } else {
    throw new Error("400 : input can not be empty");
  }

  return finalresult;
}

async function getTradeByUserId(UserID: number) {
  const tradeRepository = TradeRepository.getInstance();
  try {
    return await tradeRepository.getTradeByUserId(UserID);
  } catch (err) {
    throw new Error(`400 : Save data is not successfully`);
  }
}

async function eraseTrades(): Promise<string> {
  const tradeRepository = TradeRepository.getInstance();
  const deleteResult = await tradeRepository.eraseTrades();
  console.log("deleteResult ---> ", deleteResult);
  if (deleteResult) {
    return `200 : trades was erased successfully`;
  } else {
    throw new Error(
      `400 : Delete data is not successfully, don't have data in Database`
    );
  }
}

export default {
  findAllTrades,
  createTrade,
  getTradeByUserId,
  eraseTrades,
};
