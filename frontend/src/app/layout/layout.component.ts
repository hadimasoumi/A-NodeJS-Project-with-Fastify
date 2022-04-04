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

  loading1;
  loading2;
  loading3;
  loading4;
  constructor(
    private stockApi: StockApiService,
    private tradeApi: tradeApiService,
    private userApi: UserApiService
  ) {}

  async ngOnInit() {
    this.tabChanged(0);
  }

  async tabChanged(index) {
    if (index == 0) {
      this.loading1 = true;
      this.statList = await this.stockApi.getStockStats();
      this.loading1 = false;
    } else if (index == 1) {
      this.loading2 = true;
      this.stocksList = await this.stockApi.GetStockList();
      this.loading2 = false;
    } else if (index == 2) {
      this.loading3 = true;
      this.tradesList = await this.tradeApi.GetTradesList();
      this.loading3 = false;
    } else if (index == 3) {
      this.loading4 = true;
      this.userList = await this.userApi.GetUserList();
      this.loading4 = false;
    }
  }
}
