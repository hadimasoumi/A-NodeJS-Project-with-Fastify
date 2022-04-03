import { isPlatformBrowser } from "@angular/common";
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from "@angular/core";
import { Router } from "@angular/router";
import { CustomStorageService } from "src/app/shared/service/utils";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  itemsCount;
  isCollapsed = true;
  lastScrollTop = 0;
  isBrowser;
  hidden = false;
  cartCount = 0;
  timedOutCloser;

  constructor(
    private eRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId,
    public router: Router,
    public storage: CustomStorageService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {}

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (this.isBrowser) {
      this.hidden = window.scrollY > this.lastScrollTop ? true : false;
      this.isCollapsed = true;
      this.lastScrollTop = window.scrollY <= 0 ? 0 : window.scrollY;
    }
  }

  @HostListener("document:click", ["$event"])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isCollapsed = true;
    }
  }

  scroll() {
    this.hidden = !this.hidden;
  }
}
