import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingMain } from 'src/app/core/routing/routing-routing.module';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: RoutingMain
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
