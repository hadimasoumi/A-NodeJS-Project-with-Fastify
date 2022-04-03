import { CommonModule } from "@angular/common";
import { MaterialModule } from "./material/material.module";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { PipesModule } from "./pipes/pipes.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { RouterModule } from "@angular/router";
import { NgPipesModule } from "ngx-pipes";

import { PopoverModule } from "ngx-bootstrap/popover";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
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
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    ElementsModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    CollapseModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgPipesModule,
    PopoverModule,
    BsDropdownModule,
    ElementsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
