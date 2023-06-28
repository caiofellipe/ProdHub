import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from './shared/components/layout/layout.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'login'},
  {
    path: '',
    loadChildren: () => import('./shared/components/layout/layout.module').then((m) => LayoutModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./core/authentication/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'cadastre-se',
    loadChildren: () => import('./core/authentication/cadastrar-usuario/cadastrar-usuario.module').then((m) => m.CadastrarUsuarioModule)
  },
  {
    path: '',
    loadChildren: () => import('./core/routing/routing.module').then((m) => m.RoutingModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
