"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stock_repository_1 = __importDefault(require("../repositories/stock.repository"));
const trade_controller_1 = __importDefault(require("./trade.controller"));
async function DeleteAllStocks() {
    const tradeRepository = stock_repository_1.default.getInstance();
    tradeRepository
        .DeleteAllStocks()
        .then((result) => {
        return result;
    })
        .catch((error) => {
        console.log("error in StockConroller -> DeleteAllStocks >> ", error);
        throw new Error("400 : " + error.toString());
    });
}
async function GetAllStocks() {
    const tradeRepository = stock_repository_1.default.getInstance();
    let result = [];
    return tradeRepository
        .GetAllStocks()
        .then(async (stocks) => {
        for (const stock of stocks) {
            const highlow = await trade_controller_1.default.GetStockHightLowPriceBySymbol(stock.symbol);
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
        console.log("error in stockController -> GetAllStocks ---> ", error);
        throw new Error(error);
    });
}
async function UpdateStock(reqUpdate) {
    const stockRepository = stock_repository_1.default.getInstance();
    try {
        await stockRepository.UpdateStock(reqUpdate);
        return `201 : Save data is successfully`;
    }
    catch (err) {
        throw new Error(`400 : update data is not successfully`);
    }
}
async function GetStockBySymbol(symbol) {
    const stockRepository = stock_repository_1.default.getInstance();
    try {
        return await stockRepository.GetStockBySymbol(symbol);
    }
    catch (err) {
        throw new Error(`400 : Save data is not successfully`);
    }
}
async function CreateStock(reqCreate) {
    const stockRepository = stock_repository_1.default.getInstance();
    try {
        await stockRepository.CreateStock(reqCreate);
        return `201 : Save data is successfully`;
    }
    catch (err) {
        throw new Error(`400 : update data is not successfully`);
    }
}
async function UpsertStock(reqCreate) {
    const stockRepository = stock_repository_1.default.getInstance();
    return stockRepository
        .UpsertStock(reqCreate)
        .then((result) => {
        return result;
    })
        .catch((error) => {
        console.log("error in stockController -> upsertStock ---> ", error);
        throw new Error(error);
    });
}
async function CreateStockIfNotExists(reqCreate) {
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
    DeleteAllStocks,
    GetAllStocks,
    UpdateStock,
    GetStockBySymbol,
    CreateStock,
    UpsertStock,
    CreateStockIfNotExists,
};
//# sourceMappingURL=stock.controller.js.map