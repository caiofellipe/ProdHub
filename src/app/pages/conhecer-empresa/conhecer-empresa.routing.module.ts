import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConhecerEmpresaComponent } from './conhecer-empresa.component';
import { RoutingMain } from 'src/app/core/routing/routing-main.module';

const routes: Routes = [
  { path: ':id', component: ConhecerEmpresaComponent, children: RoutingMain},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConhecerEmpresaRoutingModule { }