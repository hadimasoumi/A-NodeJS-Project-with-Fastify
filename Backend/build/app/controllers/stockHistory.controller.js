"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stockHistory_repository_1 = __importDefault(require("../repositories/stockHistory.repository"));
const stock_controller_1 = __importDefault(require("./stock.controller"));
async function findAllStockHistoryBySymbol(symbol, startDate, endDate) {
    const stockHistoryRepository = stockHistory_repository_1.default.getInstance();
    return stock_controller_1.default.getStockBySymbol(symbol)
        .then((stock) => {
        console.log("stock ---> ", stock);
        if (stock.length > 0) {
            console.log("stock ---> ", stock);
            return stockHistoryRepository.findAllStockHistoryByStockId(stock[0].id, startDate, endDate);
        }
        else
            return [];
    })
        .catch((error) => {
        throw new Error(error);
    });
}
async function createStockHistory(reqCreate) {
    const stockHistoryRepository = stockHistory_repository_1.default.getInstance();
    try {
        return await stockHistoryRepository.createStockHistory(reqCreate);
    }
    catch (err) {
        throw new Error(`400 : update data is not successfully`);
    }
}
exports.default = {
    findAllStockHistoryBySymbol,
    createStockHistory,
};
//# sourceMappingURL=stockHistory.controller.js.map