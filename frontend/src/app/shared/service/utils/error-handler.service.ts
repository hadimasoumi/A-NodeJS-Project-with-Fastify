import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { NotificationService } from "./notification.service";
import { Router } from "@angular/router";
import swal from "sweetalert2";
import * as _ from "lodash";

@Injectable({
  providedIn: "root",
})
export class ErrorHandlerService {
  dialogRef;
  constructor(
    public dialog: MatDialog,
    public notificationService: NotificationService,
    private router: Router
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                                errorHandler                                */
  /* -------------------------------------------------------------------------- */

  errorHandler(error: HttpErrorResponse) {
    console.log("error >> ", error);
    // log
    let newError;
    // const ErrorCode = _.get(
    //   error,
    //   "error.error[0].ErrorCode",
    //   _.get(error, "error.error[0].ErrorCode")
    // );

    // if (_.get(error, "statusText", undefined) != "Unknown Error") {
    //   newError = {
    //     errorStatus: _.get(
    //       error,
    //       "error.error[0].ErrorCode",
    //       _.get(error, "error.error[0].ErrorCode", 400)
    //     ),
    //     errorMessage: _.get(error, "error.error[0].ErrorMsg", ""),
    //     errorError: _.get(error, "error", undefined),
    //   };
    // }
    this.errorAlert(error.message);
    return throwError(error);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  errorAlert(errorMessage) {
    swal
      .fire({
        title: "Error",
        // titleText: errorMessage.errorStatus,
        text: errorMessage,
        // icon: 'error',
        // iconColor: 'red',
        showDenyButton: false,
        cancelButtonText: "close",
        showCancelButton: true,
        showConfirmButton: false,
        focusConfirm: false,
        focusCancel: true,
        customClass: {
          cancelButton: "btn border-grey-1 grey-back bc farsi col small",
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
        if (result.isDenied) {
          this.router.navigate(["/"]);
        }
      });
  }

  /* ------------------------------- forceLogout ------------------------------ */

  forceLogout() {
    localStorage.clear();
    this.router.navigate(["/"]);
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
}
