import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const RoutingMain: Routes = [
  {
    path: 'planos',
    loadChildren: () => import('../../pages/planos/planos.module').then(m => m.PlanosModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('../../pages/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: 'empresas',
    loadChildren: () => import('../../pages/empresas/empresas.module').then(m => m.EmpresasModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(RoutingMain)],
  exports: [RouterModule]
})
export class RoutingMainModule { }
export { RoutingMain }
