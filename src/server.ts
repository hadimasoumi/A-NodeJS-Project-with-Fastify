import App from "./app";
import { TradesRoutes, EraseRoutes, StocksRoutes, UserRoutes } from "./routes";

const app = new App({
  routes: [TradesRoutes, EraseRoutes, StocksRoutes, UserRoutes],
  plugins: [],
});

app.listen();

export { app };
