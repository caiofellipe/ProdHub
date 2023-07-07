import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LayoutModule } from "../components/layout/layout.module";
import { ToastrModule } from "ngx-toastr";
import { NgxMaskModule } from "ngx-mask";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      LayoutModule,
      NgbModule,
      ToastrModule.forRoot(),
      NgxMaskModule.forRoot(),
    ],
    exports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      LayoutModule,
      NgbModule,
      ToastrModule,
      NgxMaskModule,
    ],
  })
export class InterfaceModule { }