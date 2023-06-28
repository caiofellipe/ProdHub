import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InterfaceModule } from 'src/app/shared/modules/interface.module';
import { PlanosRoutingModule } from './planos-routing.module';
import { PlanosComponent } from './planos.component';


@NgModule({
  declarations: [
    PlanosComponent
  ],
  imports: [
    CommonModule,
    PlanosRoutingModule,
    InterfaceModule,
  ],
})
export class PlanosModule { }
