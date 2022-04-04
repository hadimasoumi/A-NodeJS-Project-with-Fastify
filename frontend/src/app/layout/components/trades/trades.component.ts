import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { tradeApiService } from "src/app/shared/api/trade-api.service";
import moment from "moment";
interface queryParams {
  start_date: string;
  end_date: string;
}
@Component({
  selector: "app-trades",
  templateUrl: "./trades.component.html",
  styleUrls: ["./trades.component.scss"],
})
export class TradesComponent implements OnInit {
  @Input() trades = [];
  endpage = 10;
  step = 10;
  tradesOriginal;
  pageEvent: PageEvent;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [50, 75, 100, 125, 150];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    "id",
    "type",
    "symbol",
    "shares",
    "price",
    "user",
    "timestamp",
  ];
  @ViewChild(MatSort, { static: true }) newSort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  startDate = null;
  endDate = null;

  form: FormGroup;

  /* ------------------------------- constructor ------------------------------ */
  constructor(
    public cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private api: tradeApiService
  ) {}
  /* -------------------------------- ngOnInit -------------------------------- */
  ngOnInit() {
    this.form = this.fb.group({
      start_date: [],
      end_date: [],
    });
    this.tradesOriginal = [...this.trades];
  }

  async search() {
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
      this.trades = await this.api.GetTradesList(qparams);
      this.generateTable();
    }
  }

  /* -------------------------------- loadMore; ------------------------------- */
  loadMore() {
    if (this.trades && this.trades.length <= this.endpage + this.step) {
      this.endpage = this.trades.length;
    } else {
      this.endpage = this.endpage + this.step;
    }
  }
  /* ------------------------------- ngOnChanges ------------------------------ */
  ngOnChanges(changes: SimpleChanges) {
    // console.log('changes ---> ', changes);
    console.log("changes ---> ", changes);

    if (changes.trades) this.generateTable();
  }

  /* ------------------------------- LimitOrders ------------------------------ */
  LimitTrades(event) {
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
  dataTableGenerator(trades) {
    return new MatTableDataSource(
      trades.map((item) => {
        return item;
      })
    );
  }

  /* ------------------------------ generateTable ----------------------------- */
  generateTable() {
    this.dataSource = this.dataTableGenerator(this.trades);
    this.dataSource.sort = this.newSort;
    this.dataSource.paginator = this.paginator;

    this.cdRef.detectChanges();
  }
}
