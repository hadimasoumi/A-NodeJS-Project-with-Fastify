import { Component, OnInit } from "@angular/core";
import { StockApiService } from "../shared/api/stock-api.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  stocksList = [];
  constructor(private stockApi: StockApiService) {}

  ngOnInit(): void {}

  async tabChanged(event) {
    console.log("event >> ", event);
    if (event.index == 0) {
      this.stocksList = await this.stockApi.GetStockList();
    } else if (event.index == 1) {
    } else if (event.index == 2) {
    } else if (event.index == 3) {
    }
  }
}
