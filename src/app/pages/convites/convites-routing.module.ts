import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvitesComponent } from './convites.component';
import { RoutingMain } from 'src/app/core/routing/routing-main.module';

const routes: Routes = [
  { path: '', component: ConvitesComponent, children: RoutingMain }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvitesRoutingModule { }
