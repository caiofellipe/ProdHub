import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { EmpresasComponent } from './empresas.component';
import { EmpresasFormComponent } from './empresas-form/empresas-form.component';
import { InterfaceModule } from 'src/app/shared/modules/interface.module';


@NgModule({
  declarations: [
    EmpresasComponent,
    EmpresasFormComponent,
  ],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    InterfaceModule
  ]
})
export class EmpresasModule { }
