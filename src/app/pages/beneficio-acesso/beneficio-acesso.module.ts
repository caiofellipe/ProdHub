import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficioAcessoRoutingModule } from './beneficio-acesso-routing.module';
import { InterfaceModule } from 'src/app/shared/modules/interface.module';
import { BeneficioAcessoComponent } from './beneficio-acesso.component';
import { BeneficioAcessoFormComponent } from './beneficio-acesso-form/beneficio-acesso-form.component';


@NgModule({
  declarations: [
    BeneficioAcessoComponent,
    BeneficioAcessoFormComponent,
  ],
  imports: [
    CommonModule,
    BeneficioAcessoRoutingModule,
    InterfaceModule,
  ]
})
export class BeneficioAcessoModule { }
