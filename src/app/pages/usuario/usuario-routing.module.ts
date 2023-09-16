import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioComponent } from './usuario.component';
import { RoutingMain } from 'src/app/core/routing/routing-main.module';

const routes: Routes = [
  { path: '', component: UsuarioComponent, children: RoutingMain},
  { path: ':id', component: UsuarioComponent, children: RoutingMain},
  { path: 'cadastrar-usuario', component: UsuarioFormComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
