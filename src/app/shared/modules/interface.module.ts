import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxMaskModule } from "ngx-mask";
import { ToastrModule } from "ngx-toastr";
import { ToolbarComponent } from "src/app/core/components/layout/toolbar/toolbar.component";
import { LayoutModule } from "../../core/components/layout/layout.module";

@NgModule({
    declarations: [
     // ToolbarComponent,
    ],
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
     // ToolbarComponent,
    ],
  })
export class InterfaceModule { }