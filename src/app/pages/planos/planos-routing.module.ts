import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanosComponent } from './planos.component';
import { RoutingMain } from 'src/app/core/routing/routing-main.module';

const routes: Routes = [
  { path: '', component: PlanosComponent, children: RoutingMain },
  { path: ':id', component: PlanosComponent, children: RoutingMain }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanosRoutingModule { }
