import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StaticService {
  constructor() {}
  public staticMeta = {
    "/home": {
      title: "",
      description: "",
      keywords: [],
      imageSrc: "",
      ogtype: "website",
      domain: "https://bargheman.com/",
      follow: true,
    },
    "/about-us": {
      title: "برق من | درباره ما",
      description: "وب سایت رسمی استعلام قبض برق،قبض سبز",
      keywords: "",
      imageSrc: "",
      ogtype: "website",
      domain: "https://bargheman.com/",
      follow: true,
    },
  };
}
