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

  public GetUserList() {
    return this.httpService.requestCreator(
      "get", // method
      undefined, // payload
      "/users" // url
    );
  }
}
