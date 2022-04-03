"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = __importDefault(require("../core/entities/schemas"));
class StockRepository {
    constructor() {
        this.createStockIfNotExists = async (reqCreate) => {
            const stockRepository = StockRepository.getInstance();
            return stockRepository
                .getStockBySymbol(reqCreate.symbol)
                .then(async (result) => {
                if (result.length > 0) {
                    return result[0];
                }
                else {
                    return this.createStock(reqCreate);
                }
            })
                .catch((error) => {
                throw new Error(error);
            });
        };
    }
    static getInstance() {
        if (!StockRepository.instance) {
            StockRepository.instance = new StockRepository();
        }
        return StockRepository.instance;
    }
    async deleteAllStocks() {
        return schemas_1.default.Stock.destroy({
            where: {},
            force: true,
        });
    }
    async findAllStocks() {
        return await schemas_1.default.Stock.findAll();
    }
    async updateStock(stock) {
        try {
            const result = await schemas_1.default.Stock.update({
                price: stock.price,
            }, {
                where: {
                    id: stock.id,
                },
            });
            return result;
        }
        catch (error) { }
    }
    async getStockBySymbol(symbol) {
        try {
            const result = await schemas_1.default.Stock.findAll({
                where: {
                    symbol: symbol,
                },
            });
            return result;
        }
        catch (error) { }
    }
    async createStock(stock) {
        if (stock.symbol == "AAV")
            console.log("stock33333 >> ");
        return schemas_1.default.Stock.create(stock)
            .then((result) => {
            return result;
        })
            .catch((error) => {
            console.log("error in stockRepository -> createStock ---> ", error);
            throw new Error(error);
        });
    }
    async upsertStock(stock) {
        try {
            const result = await schemas_1.default.Stock.upsert(stock);
            console.log("result ---> ", result);
            return result;
        }
        catch (error) { }
    }
}
exports.default = StockRepository;
//# sourceMappingURL=stock.repository.js.map