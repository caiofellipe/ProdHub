import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/authentication/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'home'},
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./core/components/layout/layout.module').then((m) => m.LayoutModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'conhecer-empresa',
    loadChildren: () => import('./pages/conhecer-empresa/conhecer-empresa.module').then((m) => m.ConhecerEmpresaModule)
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
    canActivate: [AuthGuard],
    loadChildren: () => import('./core/routing/routing.module').then((m) => m.RoutingModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
