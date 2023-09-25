import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratarPlanosComponent } from './contratar-planos.component';

const routes: Routes = [
  { path: '', component: ContratarPlanosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratarPlanosRoutingModule { }
