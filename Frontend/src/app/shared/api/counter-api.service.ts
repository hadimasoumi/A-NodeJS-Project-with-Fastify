import { Injectable } from "@angular/core";
import { HttpService, NotificationService } from "../service/utils";

@Injectable({
  providedIn: "root",
})
export class CounterApiService {
  constructor(
    public httpService: HttpService,
    public notificationService: NotificationService
  ) {}

  /* --------------------------------- GetCounterMakers -------------------------------- */
  public GetCounterMakers() {
    return this.httpService.requestCreator(
      "get", // method
      undefined, // payload
      "/api/satep/GetMeterCompany" // url
    );
  }
}
