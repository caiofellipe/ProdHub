import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratarPlanosRoutingModule } from './contratar-planos-routing.module';
import { InterfaceModule } from 'src/app/shared/modules/interface.module';
import { ContratarPlanosComponent } from './contratar-planos.component';
import { ContratarPlanosModalComponent } from './contratar-planos-modal/contratar-planos-modal.component';


@NgModule({
  declarations: [
    ContratarPlanosComponent,
    ContratarPlanosModalComponent
  ],
  imports: [
    CommonModule,
    ContratarPlanosRoutingModule,
    InterfaceModule,
  ]
})
export class ContratarPlanosModule { }
