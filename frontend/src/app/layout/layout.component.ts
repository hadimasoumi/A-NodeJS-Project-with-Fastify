import { Component, OnInit } from "@angular/core";
import { StockApiService } from "../shared/api/stock-api.service";
import { tradeApiService } from "../shared/api/trade-api.service";
import { UserApiService } from "../shared/api/user-api.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  statList = [];
  stocksList = [];
  tradesList = [];
  userList = [];
  constructor(
    private stockApi: StockApiService,
    private tradeApi: tradeApiService,
    private userApi: UserApiService
  ) {}

  async ngOnInit() {
    this.statList = await this.stockApi.getStockStats();
  }

  async tabChanged(event) {
    if (event.index == 0) {
      this.statList = await this.stockApi.getStockStats();
    } else if (event.index == 1) {
      this.stocksList = await this.stockApi.GetStockList();
    } else if (event.index == 2) {
      this.tradesList = await this.tradeApi.GetTradesList();
    } else if (event.index == 3) {
      this.userList = await this.userApi.GetUserList();
    }
  }
}
