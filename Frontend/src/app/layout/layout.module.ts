import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LayoutRoutingModule } from "./layout-routing.module";
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SharedModule } from "../shared/shared.module";
import { UsersComponent } from './components/users/users.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { TradesComponent } from './components/trades/trades.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, UsersComponent, StocksComponent, TradesComponent],
  imports: [CommonModule, LayoutRoutingModule, SharedModule],
})
export class LayoutModule {}
