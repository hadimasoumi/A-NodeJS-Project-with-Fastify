import { Component, OnInit } from "@angular/core";
import { StockApiService } from "../shared/api/stock-api.service";
import { tradeApiService } from "../shared/api/trade-api.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  stocksList = [];
  tradesList = [];
  constructor(
    private stockApi: StockApiService,
    private tradeApi: tradeApiService
  ) {}

  async ngOnInit() {
    this.stocksList = await this.stockApi.GetStockList();
  }

  async tabChanged(event) {
    if (event.index == 0) {
      this.stocksList = await this.stockApi.GetStockList();
    } else if (event.index == 1) {
    } else if (event.index == 2) {
      this.tradesList = await this.tradeApi.GetTradesList();
    } else if (event.index == 3) {
    }
  }
}
