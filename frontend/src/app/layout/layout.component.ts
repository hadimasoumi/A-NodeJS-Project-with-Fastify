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
  stocksList = [];
  tradesList = [];
  userList = [];
  constructor(
    private stockApi: StockApiService,
    private tradeApi: tradeApiService,
    private userApi: UserApiService
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
      this.userList = await this.userApi.GetUserList();
    }
  }
}
