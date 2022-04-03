"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stock_repository_1 = __importDefault(require("../repositories/stock.repository"));
const tradeHistory_controller_1 = __importDefault(require("./tradeHistory.controller"));
async function deleteAllStocks() {
    const tradeRepository = stock_repository_1.default.getInstance();
    tradeRepository
        .deleteAllStocks()
        .then((result) => {
        return result;
    })
        .catch((error) => {
        console.log("error in StockConroller -> deleteAllStocks >> ", error);
        throw new Error("400 : " + error.toString());
    });
}
async function findAllStocks() {
    const tradeRepository = stock_repository_1.default.getInstance();
    let result = [];
    return tradeRepository
        .findAllStocks()
        .then(async (stocks) => {
        for (const stock of stocks) {
            const highlow = await tradeHistory_controller_1.default.getHightLowPriceTradeHistoryBySymbol(stock.symbol);
            const response = {
                id: stock.id,
                symbol: stock.symbol,
                price: stock.price,
                highest: highlow.highest,
                lowest: highlow.lowest,
            };
            result.push(response);
        }
        return result;
    })
        .catch((error) => {
        console.log("error in stockController -> findAllStocks ---> ", error);
        throw new Error(error);
    });
}
async function updateStock(reqUpdate) {
    const stockRepository = stock_repository_1.default.getInstance();
    try {
        await stockRepository.updateStock(reqUpdate);
        return `201 : Save data is successfully`;
    }
    catch (err) {
        throw new Error(`400 : update data is not successfully`);
    }
}
async function getStockBySymbol(symbol) {
    const stockRepository = stock_repository_1.default.getInstance();
    try {
        return await stockRepository.getStockBySymbol(symbol);
    }
    catch (err) {
        throw new Error(`400 : Save data is not successfully`);
    }
}
async function createStock(reqCreate) {
    const stockRepository = stock_repository_1.default.getInstance();
    try {
        await stockRepository.createStock(reqCreate);
        return `201 : Save data is successfully`;
    }
    catch (err) {
        throw new Error(`400 : update data is not successfully`);
    }
}
async function upsertStock(reqCreate) {
    const stockRepository = stock_repository_1.default.getInstance();
    return stockRepository
        .upsertStock(reqCreate)
        .then((result) => {
        return result;
    })
        .catch((error) => {
        console.log("error in stockController -> upsertStock ---> ", error);
        throw new Error(error);
    });
}
async function createStockIfNotExists(reqCreate) {
    if (reqCreate.symbol == "AAV")
        console.log("re >> ", reqCreate);
    const stockRepository = stock_repository_1.default.getInstance();
    return stockRepository
        .createStockIfNotExists(reqCreate)
        .then((result) => {
        return result;
    })
        .catch((error) => {
        console.log("error in stockController -> createStockIfNotExists ---> ", error);
        throw new Error(error);
    });
}
exports.default = {
    deleteAllStocks,
    findAllStocks,
    updateStock,
    getStockBySymbol,
    createStock,
    upsertStock,
    createStockIfNotExists,
};
//# sourceMappingURL=stock.controller.js.map