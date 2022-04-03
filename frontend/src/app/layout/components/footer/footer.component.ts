import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { environment } from "src/environments/environment";

import packageJson from "../../../../../package.json";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit {
  links: Array<any>;
  greenBill: Array<any>;
  systems: Array<any>;
  guides: Array<any>;
  envoName;
  version;
  constructor() {
    this.envoName = environment;
    // console.log('this.envoName.arvanPort ---> ', this.envoName.arvanPort);
    this.version = packageJson.version;
  }

  ngOnInit() {}
}
