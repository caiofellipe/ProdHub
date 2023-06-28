import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastrarUsuarioRoutingModule } from './cadastrar-usuario-routing.module';
import { CadastrarUsuarioComponent } from './cadastrar-usuario.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    CadastrarUsuarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    CadastrarUsuarioRoutingModule
  ]
})
export class CadastrarUsuarioModule { }
