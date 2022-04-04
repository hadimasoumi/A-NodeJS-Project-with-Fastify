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
  @Input() loading;
  stocksOriginal;
  pageEvent: PageEvent;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [10, 20, 40, 60, 80];
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
