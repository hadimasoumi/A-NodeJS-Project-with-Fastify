import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
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
    // log
    let newError;
    // if (
    //   error.error &&
    //   error.error.error &&
    //   error.error.error[0] &&
    //   error.error.error[0].ErrorCode != 621
    // ) {
    //   newError = {
    //     errorStatus: error.error.error[0].ErrorCode
    //       ? error.error.error[0].ErrorCode
    //       : 400,
    //     errorMessage: error.error.error[0].ErrorMsg,
    //     errorError: error.error ? error.error : undefined
    //   };
    // } else if (
    //   error.error &&
    //   error.error.error &&
    //   error.error.error[0] &&
    //   error.error.error[0].ErrorCode == 621
    // ) {
    //   // this.router.navigate(['/home']);
    //   newError = {
    //     errorStatus: error.error.error[0].ErrorCode
    //       ? error.error.error[0].ErrorCode
    //       : 400,
    //     errorMessage: error.error.error[0].ErrorMsg,
    //     errorError: error.error ? error.error : undefined
    //   };
    //   // this.router.navigate(['/home']);
    // } else {
    //   newError = {
    //     errorStatus: 400,
    //     errorMessage: 'خطای ناشناخته سیستمی',
    //     errorError: error
    //   };
    // }

    const ErrorCode = _.get(
      error,
      'error.error[0].ErrorCode',
      _.get(error, 'error.error[0].ErrorCode')
    );

    if (ErrorCode == 561) {
      this.forceLogout();
    }
    if (_.get(error, 'statusText', undefined) != 'Unknown Error') {
      newError = {
        errorStatus: _.get(
          error,
          'error.error[0].ErrorCode',
          _.get(error, 'error.error[0].ErrorCode', 400)
        ),
        errorMessage: _.get(error, 'error.error[0].ErrorMsg', ''),
        errorError: _.get(error, 'error', undefined),
      };
    }
    this.errorAlert(newError);
    return throwError(error);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  errorAlert(errorMessage) {
    console.log('errorMessage :>> ', errorMessage);
    // this.dialogRef = this.dialog.open(ErrorComponent, {
    //   panelClass: 'primary-mat-dialog-container',
    //   data: errorMessage
    // });
    swal
      .fire({
        title: 'خطا',
        // titleText: errorMessage.errorStatus,
        text:
          errorMessage.errorMessage && errorMessage.errorMessage != ''
            ? errorMessage.errorMessage
            : 'خطای ناشناخته سمت سرور',
        // icon: 'error',
        // iconColor: 'red',
        confirmButtonText: 'بارگذاری مجدد سایت',
        showDenyButton: false,
        denyButtonText: 'خانه',
        cancelButtonText: 'بستن',
        showCancelButton: true,
        showConfirmButton: false,
        focusConfirm: false,
        focusCancel: true,
        customClass: {
          title: 'farsi',
          confirmButton: 'btn failed-back wc farsi col small',
          denyButton: 'btn success-back wc farsi col small',
          cancelButton: 'btn border-grey-1 grey-back bc farsi col small',
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
        if (result.isDenied) {
          this.router.navigate(['/']);
        }
      });
  }

  /* ------------------------------- forceLogout ------------------------------ */

  forceLogout() {
    localStorage.clear();
    this.router.navigate(['/']);
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
}
