import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarUsuarioComponent } from './cadastrar-usuario.component';

const routes: Routes = [
  { path: '', component: CadastrarUsuarioComponent },
  { path: ':id', component: CadastrarUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastrarUsuarioRoutingModule { }
