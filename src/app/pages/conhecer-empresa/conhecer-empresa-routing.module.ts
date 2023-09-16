import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConhecerEmpresaComponent } from './conhecer-empresa.component';

const routes: Routes = [
  {path: '', component: ConhecerEmpresaComponent},
  {path: ':id', component: ConhecerEmpresaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConhecerEmpresaRoutingModule { }
