import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InterfaceModule } from 'src/app/shared/modules/interface.module';
import { ContratarPlanosModalEditComponent } from './contratar-planos-modal-edit/contratar-planos-modal-edit.component';
import { ContratarPlanosModalComponent } from './contratar-planos-modal/contratar-planos-modal.component';
import { PlanosRoutingModule } from './planos-routing.module';
import { PlanosComponent } from './planos.component';


@NgModule({
  declarations: [
    PlanosComponent,
    ContratarPlanosModalEditComponent,
    ContratarPlanosModalComponent,
  ],
  imports: [
    CommonModule,
    PlanosRoutingModule,
    InterfaceModule,
  ],
})
export class PlanosModule { }
