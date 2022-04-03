"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tradeHistory_repository_1 = __importDefault(require("../repositories/tradeHistory.repository"));
const stock_controller_1 = __importDefault(require("./stock.controller"));
const trade_controller_1 = __importDefault(require("./trade.controller"));
async function deleteAllTradeHistory() {
    const tradeHistoryRepository = tradeHistory_repository_1.default.getInstance();
    return tradeHistoryRepository
        .deleteAllTradeHistory()
        .then((result) => {
        return result;
    })
        .catch((error) => {
        console.log("error in TradeHistoryConroller -> deleteAllTradeHistory >> ", error);
        throw new Error("400 : " + error.toString());
    });
}
async function findAllTradeHistoryBySymbol(symbol, startDate, endDate) {
    const tradeHistoryRepository = tradeHistory_repository_1.default.getInstance();
    return stock_controller_1.default.getStockBySymbol(symbol)
        .then((stock) => {
        if (stock.length > 0) {
            return tradeHistoryRepository.findAllTradeHistoryByStockId(stock[0].id, startDate, endDate);
        }
        else
            return null;
    })
        .catch((error) => {
        throw new Error(error);
    });
}
async function getHightLowPriceTradeHistoryBySymbol(symbol, startDate, endDate) {
    const stock = await stock_controller_1.default.getStockBySymbol(symbol);
    if (stock.length > 0) {
        const tradeHistoryRepository = tradeHistory_repository_1.default.getInstance();
        return tradeHistoryRepository
            .findAllTradeHistoryByStockId(stock[0].id, startDate, endDate)
            .then((trades) => {
            let result = {
                symbol: symbol,
                highest: 0,
                lowest: 0,
            };
            if (trades.length > 0) {
                const prices = trades.map((x) => { var _a; return (_a = x.Trade) === null || _a === void 0 ? void 0 : _a.price; });
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
async function getStockStatsBySymbol(symbol, startDate, endDate) {
    let response = { stock: symbol };
    return trade_controller_1.default.findTradesBySymbol(symbol, startDate, endDate)
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
async function getStocksStats(startDate, endDate) {
    let result = [];
    try {
        const stocks = await stock_controller_1.default.findAllStocks();
        for (const stock of stocks) {
            const response = (await getStockStatsBySymbol(stock.symbol, startDate, endDate));
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
    console.log("result 33333 >> ", result);
    return result;
}
async function createTradeHistory(reqCreate) {
    const tradeHistoryRepository = tradeHistory_repository_1.default.getInstance();
    return tradeHistoryRepository
        .createTradeHistory(reqCreate)
        .then((result) => {
        return result;
    })
        .catch((error) => {
        console.log("error in tradeHistoryHandler -> createTradeHistory ---> ", error);
        throw new Error(error);
    });
}
exports.default = {
    deleteAllTradeHistory,
    findAllTradeHistoryBySymbol,
    createTradeHistory,
    getHightLowPriceTradeHistoryBySymbol,
    getStocksStats,
    getStockStatsBySymbol,
};
//# sourceMappingURL=tradeHistory.controller.js.map