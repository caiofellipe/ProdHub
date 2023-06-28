import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const RoutingMain: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../../pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'planos',
    loadChildren: () => import('../../pages/planos/planos.module').then(m => m.PlanosModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('../../pages/usuario/usuario.module').then(m => m.UsuarioModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(RoutingMain)],
  exports: [RouterModule]
})
export class RoutingRoutingModule { }
export { RoutingMain }
