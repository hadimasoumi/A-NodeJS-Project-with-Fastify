"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const trade_repository_1 = __importDefault(require("../repositories/trade.repository"));
const stock_controller_1 = __importDefault(require("./stock.controller"));
const user_controller_1 = __importDefault(require("./user.controller"));
async function DeleteAllTrades() {
    const tradeRepository = trade_repository_1.default.getInstance();
    return tradeRepository
        .DeleteAllTrades()
        .then(async () => {
        await Promise.all([
            stock_controller_1.default.DeleteAllStocks(),
            user_controller_1.default.DeleteAllUsers(),
        ]);
    })
        .then(() => {
        return `200 : trades was erased successfully`;
    })
        .catch((error) => {
        console.log("error >> ", error);
        throw new Error(`400 : Deleting operation was not successfully`);
    });
}
async function GetAllTrades() {
    const tradeRepository = trade_repository_1.default.getInstance();
    return tradeRepository
        .GetAllTrades()
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
        throw new Error(`400 : in GetAllTrades ` + error);
    });
}
async function GetTradesBySymbol(symbol, startDate, endDate) {
    const tradeRepository = trade_repository_1.default.getInstance();
    return tradeRepository
        .GetTradesBySymbol(symbol, startDate, endDate)
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
        throw new Error(`400 : in GetTradesBySymbol ` + error.toString());
    });
}
async function CreateTrade(reqCreate) {
    const tradeRepository = trade_repository_1.default.getInstance();
    let finalresult;
    if (reqCreate != undefined && reqCreate != null && reqCreate.symbol) {
        if (reqCreate.id) {
            const res = await tradeRepository.GetTradeById(reqCreate.id);
            if (res.length > 0) {
                throw new Error(`400 : Record already exists`);
            }
        }
        const stock = await stock_controller_1.default.CreateStockIfNotExists({
            symbol: reqCreate.symbol,
        });
        const user = await user_controller_1.default.GetUserById(reqCreate.user.id);
        if (user.length == 0) {
            await user_controller_1.default.CreateUser(reqCreate.user);
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
            .CreateTrade(reqCreateDB)
            .then(async (result) => {
            await stock_controller_1.default.UpdateStock({
                id: reqCreateDB.stock_id,
                price: reqCreate.price,
            }).then(() => {
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
async function GetTradesByUserId(UserID) {
    const tradeRepository = trade_repository_1.default.getInstance();
    const user = await user_controller_1.default.GetUserById(UserID)
        .then((result) => {
        return result;
    })
        .catch((error) => {
        console.log("erro occured in TradeCountroller -> getTradeByUserId >> ", error);
        throw new Error(error);
    });
    if ((user === null || user === void 0 ? void 0 : user.length) > 0) {
        return tradeRepository
            .GetTradesByUserId(UserID)
            .then((trades) => {
            var _a;
            if (trades.length > 0) {
                let result = [];
                for (const trade of trades) {
                    result.push({
                        id: trade.id,
                        symbol: (_a = trade.Stock) === null || _a === void 0 ? void 0 : _a.symbol,
                        type: trade.type,
                        shares: trade.shares,
                        price: trade.price,
                        timestamp: (0, moment_1.default)(trade.createdAt).format("yyyy-MM-DD HH:mm:ss"),
                        user: trade.User,
                    });
                }
                return result;
            }
            else
                return [];
        })
            .catch((error) => {
            console.log("erro occured in TradeCountroller -> GetTradesByUserId >> ", error);
            throw new Error(error);
        });
    }
    else {
        throw new Error("404 : user does not exist");
    }
}
async function GetStockHightLowPriceBySymbol(symbol, startDate, endDate) {
    const stock = await stock_controller_1.default.GetStockBySymbol(symbol);
    if (stock.length > 0) {
        const tradeRepository = trade_repository_1.default.getInstance();
        return tradeRepository
            .GetTradesByStockId(stock[0].id, startDate, endDate)
            .then((trades) => {
            let result = {
                symbol: symbol,
                highest: 0,
                lowest: 0,
            };
            if (trades.length > 0) {
                const prices = trades.map((x) => x === null || x === void 0 ? void 0 : x.price);
                result.highest = Math.max(...prices);
                result.lowest = Math.min(...prices);
            }
            else
                return {
                    message: "There are no trades in the given date range",
                };
            return result;
        })
            .catch((error) => {
            console.log("error in tradeHistoryHandler -> findAllTradeHistoryBySymbol ---> ", error);
            throw new Error(error);
        });
    }
    else
        throw new Error("404 : symbol does not exis");
}
async function GetStockStatsBySymbol(symbol, startDate, endDate) {
    let response = { stock: symbol };
    return GetTradesBySymbol(symbol, startDate, endDate)
        .then(async (trades) => {
        console.log("trades.length >> ", trades.length);
        if (trades.length == 0) {
            response.message = "There are no trades in the given date range";
        }
        else {
            const prices = trades.map((x) => x.price);
            const stats = await detectStockFluctuation(prices);
            response.fluctuations = stats === null || stats === void 0 ? void 0 : stats.fluctuations;
            response.max_rise = stats === null || stats === void 0 ? void 0 : stats.max_rise;
            response.max_fall = stats === null || stats === void 0 ? void 0 : stats.max_fall;
        }
        console.log("response >> ", response);
        return response;
    })
        .catch((error) => {
        console.log("error >> ", error);
    });
}
async function GetStocksStats(startDate, endDate) {
    let result = [];
    try {
        const stocks = await stock_controller_1.default.GetAllStocks();
        for (const stock of stocks) {
            const response = (await GetStockStatsBySymbol(stock.symbol, startDate, endDate));
            result.push(response);
        }
        return result;
    }
    catch (error) {
        console.log("error in tradeHistoryHandler -> findAllTradeHistoryBySymbol ---> ", error);
    }
}
async function GetStockStatsWithPricesBySymbol(symbol, startDate, endDate) {
    let response = { stock: symbol };
    return GetTradesBySymbol(symbol, startDate, endDate)
        .then(async (trades) => {
        console.log("trades.length >> ", trades.length);
        if (trades.length == 0) {
            response.message = "There are no trades in the given date range";
        }
        else {
            const prices = trades.map((x) => x.price);
            const stats = await detectStockFluctuation(prices);
            response.fluctuations = stats === null || stats === void 0 ? void 0 : stats.fluctuations;
            response.max_rise = stats === null || stats === void 0 ? void 0 : stats.max_rise;
            response.max_fall = stats === null || stats === void 0 ? void 0 : stats.max_fall;
            response.prices = prices;
        }
        console.log("response >> ", response);
        return response;
    })
        .catch((error) => {
        console.log("error >> ", error);
    });
}
async function GetStocksStatsWithPrices(startDate, endDate) {
    let result = [];
    try {
        const stocks = await stock_controller_1.default.GetAllStocks();
        for (const stock of stocks) {
            const response = (await GetStockStatsWithPricesBySymbol(stock.symbol, startDate, endDate));
            result.push(response);
        }
        return result;
    }
    catch (error) {
        console.log("error in tradeHistoryHandler -> findAllTradeHistoryBySymbol ---> ", error);
    }
}
function detectStockFluctuation(prices) {
    const fluctuation = [];
    let rises = [];
    let falls = [];
    let expect;
    if (prices[0] < prices[1])
        expect = "rise";
    else
        expect = "fall";
    prices.map((_, index) => {
        if (index != prices.length - 1) {
            if (prices[index] < prices[index + 1]) {
                if (expect != "rise") {
                    fluctuation.push(prices[index]);
                }
                rises.push(prices[index + 1] - prices[index]);
                expect = "rise";
            }
            else if (prices[index] > prices[index + 1]) {
                if (expect != "fall") {
                    fluctuation.push(prices[index]);
                }
                falls.push(prices[index] - prices[index + 1]);
                expect = "fall";
            }
        }
    });
    let result = { max_rise: 0, max_fall: 0, fluctuations: 0 };
    result.fluctuations = fluctuation.length;
    result.max_rise =
        rises.length > 0 ? parseFloat(Math.max(...rises).toFixed(2)) : 0.0;
    result.max_fall =
        falls.length > 0 ? parseFloat(Math.max(...falls).toFixed(2)) : 0.0;
    return result;
}
exports.default = {
    GetAllTrades,
    CreateTrade,
    GetTradesByUserId,
    DeleteAllTrades,
    GetTradesBySymbol,
    GetStockStatsBySymbol,
    GetStockHightLowPriceBySymbol,
    GetStocksStats,
    GetStocksStatsWithPrices,
};
//# sourceMappingURL=trade.controller.js.map