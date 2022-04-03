import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LayoutRoutingModule } from "./layout-routing.module";
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SharedModule } from "../shared/shared.module";
import { UsersComponent } from "./components/users/users.component";
import { StocksComponent } from "./components/stocks/stocks.component";
import { TradesComponent } from "./components/trades/trades.component";
import { StockStatsComponent } from "./components/stock-stats/stock-stats.component";
import { StockHighlowComponent } from "./components/stock-highlow/stock-highlow.component";
import { LineChartComponent } from "./components/line-chart/line-chart.component";
import { NgChartsModule } from "ng2-charts";

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    StocksComponent,
    TradesComponent,
    StockStatsComponent,
    StockHighlowComponent,
    LineChartComponent,
  ],
  imports: [CommonModule, LayoutRoutingModule, SharedModule, NgChartsModule],
})
export class LayoutModule {}
