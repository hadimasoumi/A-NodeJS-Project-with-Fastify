import App from "./app";
import { TradesRoutes, EraseRoutes, StocksRoutes } from "./routes";

const app = new App({
  routes: [TradesRoutes, EraseRoutes, StocksRoutes],
  plugins: [],
});

app.listen();
