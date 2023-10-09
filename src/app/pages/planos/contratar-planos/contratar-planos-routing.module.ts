import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratarPlanosComponent } from './contratar-planos.component';
import { RoutingMain } from 'src/app/core/routing/routing-main.module';

const routes: Routes = [
  { path: '', component: ContratarPlanosComponent, children: RoutingMain }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratarPlanosRoutingModule { }
