import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InterfaceModule } from 'src/app/shared/modules/interface.module';
import { PlanosRoutingModule } from './planos-routing.module';
import { PlanosComponent } from './planos.component';
import { PlanosFormComponent } from './planos-form/planos-form.component';
import { ProdutoModalComponent } from './produto-modal/produto-modal.component';
import { ContratarPlanosComponent } from './contratar-planos/contratar-planos.component';
import { ContratarPlanosModalEditComponent } from './contratar-planos-modal-edit/contratar-planos-modal-edit.component';


@NgModule({
  declarations: [
    PlanosComponent,
    PlanosFormComponent,
    ProdutoModalComponent,
    ContratarPlanosModalEditComponent,
  ],
  imports: [
    CommonModule,
    PlanosRoutingModule,
    InterfaceModule,
  ],
})
export class PlanosModule { }
