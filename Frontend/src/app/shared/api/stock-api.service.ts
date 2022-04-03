import { Injectable } from "@angular/core";
import { HttpService, NotificationService } from "../service/utils";

@Injectable({
  providedIn: "root",
})
export class StockApiService {
  constructor(
    public httpService: HttpService,
    public notificationService: NotificationService
  ) {}

  public GetStockList() {
    return this.httpService.requestCreator(
      "get", // method
      undefined, // payload
      "/stocks" // url
    );
  }
  public getStockStats(queryParams?: { start: string; end: string }) {
    return this.httpService.requestCreator(
      "get", // method
      undefined, // payload
      "/stocks/stats", // url
      queryParams
    );
  }

  public getStockPrice(
    symbol: string,
    queryParams?: { start: string; end: string }
  ) {
    return this.httpService.requestCreator(
      "get", // method
      undefined, // payload
      "/stocks/" + symbol + "/price/", // url
      queryParams
    );
  }

  public getAllStocksHighLowPrice(
    symbol: string,
    queryParams?: { start: string; end: string }
  ) {
    return this.httpService.requestCreator(
      "get", // method
      undefined, // payload
      "/stocks/" + symbol + "/price/", // url
      queryParams
    );
  }
}
