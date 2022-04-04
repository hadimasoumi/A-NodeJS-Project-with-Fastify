import { CommonModule } from "@angular/common";
import { MaterialModule } from "./material/material.module";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { PipesModule } from "./pipes/pipes.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgPipesModule } from "ngx-pipes";
import { ElementsModule } from "./elements/elements.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ElementsModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgPipesModule,
    ElementsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
