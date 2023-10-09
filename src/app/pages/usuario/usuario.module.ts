import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InterfaceModule } from 'src/app/shared/modules/interface.module';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';


@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioFormComponent,
  ],
  imports: [
    UsuarioRoutingModule,
    InterfaceModule,
  ]
})
export class UsuarioModule { }
