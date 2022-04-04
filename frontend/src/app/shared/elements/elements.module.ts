import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "../material/material.module";
import { PipesModule } from "../pipes/pipes.module";
import { ELoadingComponent } from "./e-loading/e-loading.component";

@NgModule({
  declarations: [ELoadingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule,
  ],
  exports: [ELoadingComponent],
  providers: [],
})
export class ElementsModule {}
