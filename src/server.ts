import App from "./app";
// import { TradesRoutes, EraseRoutes, StocksRoutes } from "./routes/mongoDB";
import { TradesRoutes, EraseRoutes, StocksRoutes } from "./routes/mariaDB";

const app = new App({
  routes: [TradesRoutes, EraseRoutes, StocksRoutes],
  plugins: [],
});

app.listen();
