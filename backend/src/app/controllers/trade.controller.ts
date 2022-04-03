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
import TradeHistoryController from "./tradeHistory.controller";
import userController from "./user.controller";

async function eraseTrades() {
  const tradeRepository = TradeRepository.getInstance();

  return TradeHistoryController.deleteAllTradeHistory().then(() => {
    return tradeRepository
      .deleteAllTrades()
      .then(async () => {
        await Promise.all([
          stockController.deleteAllStocks(),
          userController.deleteAllUsers(),
        ]);
      })
      .then(() => {
        return `200 : trades was erased successfully`;
      })
      .catch((error) => {
        `400 : Delete data is not successfully, don't have data in Database`;
      });
  });
}

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
async function findTradesBySymbol(
  symbol: string,
  startDate?: string,
  endDate?: string
) {
  const tradeRepository = TradeRepository.getInstance();
  return tradeRepository
    .findTradesBySymbol(symbol, startDate, endDate)
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
            TradeHistoryController.createTradeHistory({
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

  const user = await userController
    .getUserById(UserID)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(
        "erro occured in TradeCountroller -> getTradeByUserId >> ",
        error
      );
      throw new Error(error);
    });
  if (user?.length > 0) {
    return tradeRepository
      .getTradeByUserId(UserID)
      .then((trades) => {
        if (trades.length > 0) {
          let result: Array<TradeGetResponseInterface> = [];

          for (const trade of trades) {
            result.push({
              id: trade.id,
              symbol: trade.Stock?.symbol,
              type: trade.type,
              shares: trade.shares,
              price: trade.price,
              timestamp: moment(trade.createdAt).format("yyyy-MM-DD HH:mm:ss"),
              user: trade.User,
            });
          }
          return result;
        } else return [];
      })
      .catch((error) => {
        console.log(
          "erro occured in TradeCountroller -> getTradeByUserId >> ",
          error
        );
        throw new Error(error);
      });
  } else {
    throw new Error("404 : user does not exist");
  }
}

export default {
  findAllTrades,
  createTrade,
  getTradeByUserId,
  eraseTrades,
  findTradesBySymbol,
};
