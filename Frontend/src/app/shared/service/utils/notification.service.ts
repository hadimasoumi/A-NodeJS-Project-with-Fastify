import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BottomSheetComponent } from '../../elements/material/bottom-sheet/bottom-sheet.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private _snackBar: MatSnackBar,
    private _bottomSheet: MatBottomSheet
  ) {}

  public openWarning(
    message: string,
    time?: number,
    verticalPosition: MatSnackBarVerticalPosition = 'bottom',
    horizontalPosition: MatSnackBarHorizontalPosition = 'center'
  ) {
    this._snackBar.open(message, undefined, {
      duration: time ? time : 5000,
      panelClass: ['bc', 'warning-back'],
      verticalPosition: verticalPosition,
      horizontalPosition: horizontalPosition,
    });
  }
  // ────────────────────────────────────────────────────────────────────────────────

  public openFailure(
    message: string,
    time?: number,
    verticalPosition: MatSnackBarVerticalPosition = 'bottom',
    horizontalPosition: MatSnackBarHorizontalPosition = 'center'
  ) {
    this._snackBar.open(message, undefined, {
      duration: time ? time : 5000,
      panelClass: ['wc', 'failed-back'],
      verticalPosition: verticalPosition,
      horizontalPosition: horizontalPosition,
    });
  }
  // ────────────────────────────────────────────────────────────────────────────────

  public openSuccess(
    message: string,
    time?: number,
    verticalPosition: MatSnackBarVerticalPosition = 'bottom',
    horizontalPosition: MatSnackBarHorizontalPosition = 'center'
  ) {
    this._snackBar.open(message, undefined, {
      duration: time ? time : 5000,
      panelClass: ['wc', 'success-back'],
      verticalPosition: verticalPosition,
      horizontalPosition: horizontalPosition,
    });
  }

  public openFCM(
    message: string,
    time?: number,
    verticalPosition: MatSnackBarVerticalPosition = 'bottom',
    horizontalPosition: MatSnackBarHorizontalPosition = 'center'
  ) {
    this._bottomSheet.open(BottomSheetComponent, {
      data: {
        message: message,
        horizontalPosition: 'left',
      },
    });
  }
}
