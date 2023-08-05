import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InterfaceModule } from 'src/app/shared/modules/interface.module';
import { PlanosRoutingModule } from './planos-routing.module';
import { PlanosComponent } from './planos.component';
import { PlanosFormComponent } from './planos-form/planos-form.component';
import { ProdutoModalComponent } from './produto-modal/produto-modal.component';


@NgModule({
  declarations: [
    PlanosComponent,
    PlanosFormComponent,
    ProdutoModalComponent
  ],
  imports: [
    CommonModule,
    PlanosRoutingModule,
    InterfaceModule,
  ],
})
export class PlanosModule { }
