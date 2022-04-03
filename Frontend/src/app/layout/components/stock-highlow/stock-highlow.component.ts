import {
  ChangeDetectorRef,
  Component,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { StockApiService } from "src/app/shared/api/stock-api.service";
import moment from "moment";
interface queryParams {
  start_date: string;
  end_date: string;
}
@Component({
  selector: "app-stock-highlow",
  templateUrl: "./stock-highlow.component.html",
  styleUrls: ["./stock-highlow.component.scss"],
})
export class StockHighlowComponent implements OnInit {
  stats = [];
  endpage = 50;
  step = 50;
  statsOriginal;
  pageEvent: PageEvent;
  pageSize = 50;
  pageIndex = 0;
  pageSizeOptions: number[] = [50, 75, 100, 125, 150];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["symbol", "highest", "lowest"];
  @ViewChild(MatSort, { static: true }) newSort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  startDate;
  endDate;

  form: FormGroup;
  /* ------------------------------- constructor ------------------------------ */
  constructor(private fb: FormBuilder, private api: StockApiService) {}
  /* -------------------------------- ngOnInit -------------------------------- */
  ngOnInit() {
    this.form = this.fb.group({
      start_date: [null, [Validators.required]],
      end_date: [null, [Validators.required]],
    });

    this.statsOriginal = [...this.stats];
  }

  search() {
    const data: queryParams = this.form.getRawValue();
    console.log("data >> ", data);

    if (
      (data.start_date && data.start_date != null && data.start_date != "") ||
      (data.end_date && data.end_date != null && data.end_date != "")
    ) {
      const qparams = {
        start: moment(data.start_date).format("yyyy-MM-DD"),
        end: moment(data.end_date).format("yyyy-MM-DD"),
      };
      console.log("qparams >> ", qparams);
      // this.api.getStockPrice(qparams);
    }
  }

  /* -------------------------------- loadMore; ------------------------------- */
  loadMore() {
    if (this.stats && this.stats.length <= this.endpage + this.step) {
      this.endpage = this.stats.length;
    } else {
      this.endpage = this.endpage + this.step;
    }
  }
  /* ------------------------------- ngOnChanges ------------------------------ */
  ngOnChanges(changes: SimpleChanges) {
    // console.log('changes ---> ', changes);
    console.log("changes ---> ", changes);

    if (changes.users) this.generateTable();
  }

  /* ------------------------------- LimitOrders ------------------------------ */
  LimitUsers(event) {
    console.log(event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    return event;
  }

  /* ------------------------------- applyFilter ------------------------------ */
  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /* --------------------------- dataTableGenerator --------------------------- */
  dataTableGenerator(users) {
    return new MatTableDataSource(
      users.map((item) => {
        return item;
      })
    );
  }

  /* ------------------------------ generateTable ----------------------------- */
  generateTable() {
    this.dataSource = this.dataTableGenerator(this.stats);
    this.dataSource.sort = this.newSort;
    this.dataSource.paginator = this.paginator;
  }
}
