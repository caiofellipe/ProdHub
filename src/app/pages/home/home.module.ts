import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { InterfaceModule } from 'src/app/shared/modules/interface.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    InterfaceModule,
  ]
})
export class HomeModule { }
