import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { ErrorHandlerService } from "./error-handler.service";
// import { LoadingService } from './loading.service';
import { CustomStorageService } from "./custom-storage.service";
import { TokenService } from "./token.service";
import { NotificationService } from "./notification.service";
import { environment } from "src/environments/environment";
import { retry } from "rxjs/operators";
import { ReCaptchaService } from "./reCaptcha.service";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private errorHandleService: ErrorHandlerService,
    public customStorageService: CustomStorageService,
    public tokenService: TokenService,
    public notification: NotificationService,
    public reCaptchaService: ReCaptchaService
  ) {}

  async requestCreator(
    method: "get" | "post" | "put" | "delete" = "get",
    payload,
    url: string,
    success = false,
    cache = null,
    action?,
    spinner = true
  ) {
    let headers: any = {
      "Content-Type": "application/json; charset=utf-8",
    };
    headers = {
      ...headers,
    };

    if (spinner) {
      headers = {
        ...headers,
        spinner: "true",
      };
    }

    /* -------------------------------------------------------------------------- */
    /*                                    cache                                   */
    /* -------------------------------------------------------------------------- */

    // disable cache system for development mode
    // if (!environment.production) {
    //   cache = null;
    // }
    // check if there's cache or not
    const isCached = this.customStorageService.getCache(cache);
    if (
      isCached == undefined ||
      isCached == null ||
      (isCached && isCached["data"] == null)
    ) {
      // Set backend URL
      // const Url_app =
      //   window.location.origin == environment.hostname
      //     ? environment.hostname
      //     : environment.hostnameExternal;
      const Url_app = environment.hostname;

      // console.log('Url_app :', Url_app);

      /* -------------------------------------------------------------------------- */
      /*                                   request                                  */
      /* -------------------------------------------------------------------------- */

      // create request

      let params = {};
      if (method == "get") {
        const timeStamp = new Date();
        params["_timeStamp"] = timeStamp.getTime();
      }

      return (
        this.http
          .request(method, Url_app + url, {
            body: payload,
            headers: new HttpHeaders(headers),
            params,
          })
          // .pipe(retry(2))
          .toPromise()
          .then((result) => {
            if (cache != null) {
              this.customStorageService.setCache(cache, result);
            }
            console.log(
              "%c⧭ successful request " + method,
              "color: #00861b; font-size: 1rem; font-weight: bold;",
              {
                payload,
                api: url,
                result,
              }
            );
            if (success) {
              this.notification.openSuccess("با موفقیت ثبت گردید");
            }
            return result;
          })
          .catch((err) => {
            console.log("%c⧭ error on" + method, "color: #ff0000", err);
            this.errorHandleService.errorHandler(err);
          })
      );
    } else {
      // read from cache
      console.log(
        "%c⧭ successful cache " + method,
        "color: #00861b",
        this.customStorageService.getCache(cache)
      );
      return this.customStorageService.getCache(cache);
    }
  }

  // TODO request maker for files
}
