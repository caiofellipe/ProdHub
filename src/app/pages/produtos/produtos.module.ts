import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InterfaceModule } from 'src/app/shared/modules/interface.module';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';
import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosComponent } from './produtos.component';
import { ProdutosModalComponent } from './produtos-modal/produtos-modal.component';


@NgModule({
  declarations: [
    ProdutosComponent,
    ProdutosFormComponent,
    ProdutosModalComponent,
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    InterfaceModule,
  ]
})
export class ProdutosModule { }
