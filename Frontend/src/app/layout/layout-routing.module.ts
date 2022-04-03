import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import { SeoResolverService } from '../shared/service/SEO/seo-resolver.service';
import { LayoutComponent } from "./layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
