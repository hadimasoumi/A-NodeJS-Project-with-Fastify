"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = exports.StocksRoutes = exports.EraseRoutes = exports.TradesRoutes = void 0;
var trades_routes_1 = require("./trades.routes");
Object.defineProperty(exports, "TradesRoutes", { enumerable: true, get: function () { return __importDefault(trades_routes_1).default; } });
var erase_routes_1 = require("./erase.routes");
Object.defineProperty(exports, "EraseRoutes", { enumerable: true, get: function () { return __importDefault(erase_routes_1).default; } });
var stocks_routes_1 = require("./stocks.routes");
Object.defineProperty(exports, "StocksRoutes", { enumerable: true, get: function () { return __importDefault(stocks_routes_1).default; } });
var user_routes_1 = require("./user.routes");
Object.defineProperty(exports, "UserRoutes", { enumerable: true, get: function () { return __importDefault(user_routes_1).default; } });
//# sourceMappingURL=index.js.map