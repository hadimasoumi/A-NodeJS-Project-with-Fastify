import { Injectable, Inject } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DOCUMENT } from "@angular/common";
import { interval } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UpdateService {
  constructor(
    private swUpdate: SwUpdate,
    private _snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: Document
  ) {
    if (swUpdate.isEnabled) {
      interval(60 * 60 * 1000).subscribe(() =>
        swUpdate
          .checkForUpdate()
          .then(() => console.log("checking for updates"))
      );
    }
  }

  public checkForUpdates(): void {
    this.swUpdate.available.subscribe((event) => {
      const respond = confirm("new version of site is available.");
      if (respond === true) {
        this.promptUser(event);
      }
    });
  }

  private async promptUser(event) {
    console.log("updating to new version");
    this.swUpdate.activateUpdate().then(() => {
      // localStorage.clear();
      setTimeout(() => {
        document.location.reload();
      }, 1000);
    });
  }
}
