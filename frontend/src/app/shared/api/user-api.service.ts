import { Injectable } from "@angular/core";
import { HttpService, NotificationService } from "../service/utils";

@Injectable({
  providedIn: "root",
})
export class UserApiService {
  constructor(
    public httpService: HttpService,
    public notificationService: NotificationService
  ) {}

  public GetStockList() {
    return this.httpService.requestCreator(
      "get", // method
      undefined, // payload
      "/users" // url
    );
  }
  public getStockStats() {
    return this.httpService.requestCreator(
      "get", // method
      undefined, // payload
      "/getStockStats" // url
    );
  }

  public getStockPrice(symbol, queryParams) {
    return this.httpService.requestCreator(
      "get", // method
      undefined, // payload
      "/stocks/" + symbol + "/price/", // url
      queryParams
    );
  }
}
