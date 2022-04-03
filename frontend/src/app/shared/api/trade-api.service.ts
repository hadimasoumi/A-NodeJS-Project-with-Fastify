import { Injectable } from "@angular/core";
import { HttpService, NotificationService } from "../service/utils";

@Injectable({
  providedIn: "root",
})
export class tradeApiService {
  constructor(
    public httpService: HttpService,
    public notificationService: NotificationService
  ) {}

  public GetTradesList(queryParams?: { start: string; end: string }) {
    return this.httpService.requestCreator(
      "get", // method
      undefined, // payload
      "/trades", // url
      queryParams
    );
  }
  public eraseTrades() {
    return this.httpService.requestCreator(
      "delete", // method
      undefined, // payload
      "/trades" // url
    );
  }

  public getTradeByUserId(userId) {
    return this.httpService.requestCreator(
      "get", // method
      undefined, // payload
      "/trades/users/" + userId // url
    );
  }
}
