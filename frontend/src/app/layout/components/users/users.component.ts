import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-user",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  @Input() users = [];
  endpage = 10;
  step = 10;
  usersOriginal;
  pageEvent: PageEvent;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [10, 20, 50, 100, 500];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["ID", "Name"];
  @ViewChild(MatSort, { static: true }) newSort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  /* ------------------------------- constructor ------------------------------ */
  constructor(public cdRef: ChangeDetectorRef) {}
  /* -------------------------------- ngOnInit -------------------------------- */
  ngOnInit() {
    this.usersOriginal = [...this.users];
  }

  /* -------------------------------- loadMore; ------------------------------- */
  loadMore() {
    if (this.users && this.users.length <= this.endpage + this.step) {
      this.endpage = this.users.length;
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
    this.dataSource = this.dataTableGenerator(this.users);
    this.dataSource.sort = this.newSort;
    this.dataSource.paginator = this.paginator;

    this.cdRef.detectChanges();
  }
}
