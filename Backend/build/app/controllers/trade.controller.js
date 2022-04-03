"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const trade_repository_1 = __importDefault(require("../repositories/trade.repository"));
const stock_controller_1 = __importDefault(require("./stock.controller"));
const tradeHistory_controller_1 = __importDefault(require("./tradeHistory.controller"));
const user_controller_1 = __importDefault(require("./user.controller"));
async function eraseTrades() {
    const tradeRepository = trade_repository_1.default.getInstance();
    return tradeHistory_controller_1.default.deleteAllTradeHistory().then(() => {
        return tradeRepository
            .deleteAllTrades()
            .then(async () => {
            await Promise.all([
                stock_controller_1.default.deleteAllStocks(),
                user_controller_1.default.deleteAllUsers(),
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
    const tradeRepository = trade_repository_1.default.getInstance();
    return tradeRepository
        .findAllTrades()
        .then((trades) => {
        let res = [];
        for (const trade of trades) {
            res.push({
                id: trade.id,
                type: trade.type,
                symbol: trade.Stock.symbol,
                shares: trade.shares,
                price: trade.price,
                timestamp: (0, moment_1.default)(trade.createdAt).format("yyyy-MM-DD HH:mm:ss"),
                user: trade.User,
            });
        }
        return res;
    })
        .catch((error) => {
        throw new Error(`400 : in getAllTrades ` + error);
    });
}
async function findTradesBySymbol(symbol, startDate, endDate) {
    const tradeRepository = trade_repository_1.default.getInstance();
    return tradeRepository
        .findTradesBySymbol(symbol, startDate, endDate)
        .then((trades) => {
        let res = [];
        for (const trade of trades) {
            res.push({
                id: trade.id,
                type: trade.type,
                symbol: trade.Stock.symbol,
                shares: trade.shares,
                price: trade.price,
                timestamp: (0, moment_1.default)(trade.createdAt).format("yyyy-MM-DD HH:mm:ss"),
                user: trade.User,
            });
        }
        return res;
    })
        .catch((error) => {
        throw new Error(`400 : in getAllTrades ` + error);
    });
}
async function createTrade(reqCreate) {
    const tradeRepository = trade_repository_1.default.getInstance();
    let finalresult;
    if (reqCreate != undefined && reqCreate != null && reqCreate.symbol) {
        if (reqCreate.id) {
            const res = await tradeRepository.getTradeById(reqCreate.id);
            if (res.length > 0) {
                throw new Error(`400 : Record already exists`);
            }
        }
        const stock = await stock_controller_1.default.createStockIfNotExists({
            symbol: reqCreate.symbol,
        });
        const user = await user_controller_1.default.getUserById(reqCreate.user.id);
        if (user.length == 0) {
            await user_controller_1.default.createUser(reqCreate.user);
        }
        let reqCreateDB = {
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
            await stock_controller_1.default
                .updateStock({
                id: reqCreateDB.stock_id,
                price: reqCreate.price,
            })
                .then(() => {
                tradeHistory_controller_1.default.createTradeHistory({
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
    }
    else {
        throw new Error("400 : input can not be empty");
    }
    return finalresult;
}
async function getTradeByUserId(UserID) {
    const tradeRepository = trade_repository_1.default.getInstance();
    const user = await user_controller_1.default.getUserById(UserID);
    if ((user === null || user === void 0 ? void 0 : user.length) > 0) {
        return tradeRepository
            .getTradeByUserId(UserID)
            .then((trade) => {
            var _a;
            let result = {
                id: trade[0].id,
                symbol: (_a = trade[0].Stock) === null || _a === void 0 ? void 0 : _a.symbol,
                type: trade[0].type,
                shares: trade[0].shares,
                price: trade[0].price,
                timestamp: (0, moment_1.default)(trade[0].createdAt).format("yyyy-MM-DD HH:mm:ss"),
                user: trade[0].User,
            };
            return result;
        })
            .catch((error) => {
            throw new Error(error);
        });
    }
    else {
        throw new Error("404 : user does not exist");
    }
}
exports.default = {
    findAllTrades,
    createTrade,
    getTradeByUserId,
    eraseTrades,
    findTradesBySymbol,
};
//# sourceMappingURL=trade.controller.js.map