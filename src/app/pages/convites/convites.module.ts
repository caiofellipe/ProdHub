import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConvitesRoutingModule } from './convites-routing.module';
import { InterfaceModule } from 'src/app/shared/modules/interface.module';
import { ConvitesComponent } from './convites.component';


@NgModule({
  declarations: [
    ConvitesComponent
  ],
  imports: [
    CommonModule,
    ConvitesRoutingModule,
    InterfaceModule
  ]
})
export class ConvitesModule { }
