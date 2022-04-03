"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const app_1 = __importDefault(require("./app"));
const routes_1 = require("./routes");
const app = new app_1.default({
    routes: [routes_1.TradesRoutes, routes_1.EraseRoutes, routes_1.StocksRoutes, routes_1.UserRoutes],
    plugins: [],
});
exports.app = app;
app.listen();
//# sourceMappingURL=server.js.map