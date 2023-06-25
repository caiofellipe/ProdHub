import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const RoutingMain: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../../pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'plans',
    loadChildren: () => import('../../pages/plans/plans.module').then(m => m.PlansModule)
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
