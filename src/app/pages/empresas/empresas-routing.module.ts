import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasComponent } from './empresas.component';
import { RoutingMain } from 'src/app/core/routing/routing-main.module';

const routes: Routes = [
  { path: '', component: EmpresasComponent, children: RoutingMain},
  { path: ':id', component: EmpresasComponent, children: RoutingMain},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasRoutingModule { }
