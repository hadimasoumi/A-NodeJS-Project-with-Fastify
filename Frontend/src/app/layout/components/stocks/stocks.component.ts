import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { StockApiService } from "src/app/shared/api/stock-api.service";

@Component({
  selector: "app-stocks",
  templateUrl: "./stocks.component.html",
  styleUrls: ["./stocks.component.scss"],
})
export class StocksComponent implements OnInit, OnChanges {
  @Input() stocks = [];
  endpage = 50;
  step = 50;
  stocksOriginal;
  pageEvent: PageEvent;
  pageSize = 50;
  pageIndex = 0;
  pageSizeOptions: number[] = [50, 75, 100, 125, 150];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["id", "symbol", "price", "highest", "lowest"];
  @ViewChild(MatSort, { static: true }) newSort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  /* ------------------------------- constructor ------------------------------ */
  constructor(public cdRef: ChangeDetectorRef, private api: StockApiService) {}
  /* -------------------------------- ngOnInit -------------------------------- */
  ngOnInit() {
    this.stocksOriginal = [...this.stocks];
  }

  /* ------------------------------- ngOnChanges ------------------------------ */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.stocks) this.generateTable();
  }

  /* -------------------------------- loadMore; ------------------------------- */
  loadMore() {
    if (this.stocks && this.stocks.length <= this.endpage + this.step) {
      this.endpage = this.stocks.length;
    } else {
      this.endpage = this.endpage + this.step;
    }
  }

  /* ------------------------------- LimitOrders ------------------------------ */
  Limitstocks(event) {
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
  dataTableGenerator() {
    return new MatTableDataSource(
      this.stocks.map((item) => {
        return item;
      })
    );
  }

  /* ------------------------------ generateTable ----------------------------- */
  generateTable() {
    this.dataSource = this.dataTableGenerator();
    this.dataSource.sort = this.newSort;
    this.dataSource.paginator = this.paginator;

    this.cdRef.detectChanges();
  }
}
