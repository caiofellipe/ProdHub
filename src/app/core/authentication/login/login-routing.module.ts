import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { CadastrarUsuarioComponent } from '../cadastrar-usuario/cadastrar-usuario.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'cadastre-se', component: CadastrarUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
