import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { ContentComponent } from './content/content.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    ContentComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class LayoutModule { }
