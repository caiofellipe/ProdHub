import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficioAcessoComponent } from './beneficio-acesso.component';

const routes: Routes = [
  {path: '', component: BeneficioAcessoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficioAcessoRoutingModule { }
