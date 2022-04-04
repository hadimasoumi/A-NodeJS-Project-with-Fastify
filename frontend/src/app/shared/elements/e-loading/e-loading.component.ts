import {
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "app-e-loading",
  templateUrl: "./e-loading.component.html",
  styleUrls: ["./e-loading.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ELoadingComponent implements OnInit, OnChanges {
  @Input() public type: "table" | "ripple" | "tavanir" = "ripple";
  @Input() public color = "#3f51b5";
  @Input() public rowCount = 3;
  @Input() public colCount = 4;
  rows = [];
  cols = [];
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.rows = Array(this.rowCount)
      .fill(1)
      .map((x, i) => i); // [0,1,2,3,4]

    this.cols = Array(this.colCount)
      .fill(1)
      .map((x, i) => i); // [0,1,2,3,4]
  }
}
