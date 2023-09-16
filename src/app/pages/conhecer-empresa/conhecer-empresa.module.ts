import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConhecerEmpresaRoutingModule } from './conhecer-empresa-routing.module';
import { ConhecerEmpresaComponent } from './conhecer-empresa.component';
import { InterfaceModule } from 'src/app/shared/modules/interface.module';


@NgModule({
  declarations: [
    ConhecerEmpresaComponent,
  ],
  imports: [
    CommonModule,
    ConhecerEmpresaRoutingModule,
    InterfaceModule
  ]
})
export class ConhecerEmpresaModule { }
