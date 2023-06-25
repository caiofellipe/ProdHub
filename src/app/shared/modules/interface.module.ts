import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "src/app/app-routing.module";
import { LayoutModule } from "../components/layout/layout.module";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      LayoutModule,
    ],
    exports: [
      ReactiveFormsModule,
      FormsModule,
      LayoutModule,
    ],
  })
export class InterfaceModule { }