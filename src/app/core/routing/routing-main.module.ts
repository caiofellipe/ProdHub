import { EmpresasComponent } from './../../pages/empresas/empresas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvitesComponent } from 'src/app/pages/convites/convites.component';
import { ContratarPlanosComponent } from 'src/app/pages/planos/contratar-planos/contratar-planos.component';
import { PlanosComponent } from 'src/app/pages/planos/planos.component';
import { UsuarioComponent } from 'src/app/pages/usuario/usuario.component';

const RoutingMain: Routes = [
  {
    path: 'contratar-planos',
    loadChildren: () => import('../../pages/planos/contratar-planos/contratar-planos.module').then(m => m.ContratarPlanosModule),
    data: {
      roles: ["USER", "ADMIN"]
    }
  },
  {
    path: 'planos',
    loadChildren: () => import('../../pages/planos/planos.module').then(m => m.PlanosModule),
    data: {
      roles: ["USER", "ADMIN"]
    }
  },
  {
    path: 'usuario',
    loadChildren: () => import('../../pages/usuario/usuario.module').then(m => m.UsuarioModule),
    data: {
      roles: ["USER", "ADMIN"]
    }
  },
  {
    path: 'empresas',
    loadChildren: () => import('../../pages/empresas/empresas.module').then(m => m.EmpresasModule),
    data: {
      roles: ["USER", "ADMIN"]
    }
  },
  {
    path: 'convites',
    loadChildren: () => import('../../pages/convites/convites.module').then(m => m.ConvitesModule),
    data: {
      roles: ["USER", "ADMIN"]
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(RoutingMain)],
  exports: [RouterModule]
})
export class RoutingMainModule { }
export { RoutingMain };

