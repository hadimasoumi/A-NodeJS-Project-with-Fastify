import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { MaterialModule } from "../material/material.module";
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule,
    NgbModule,
  ],
  exports: [],
  providers: [],
})
export class ElementsModule {}
