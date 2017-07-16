import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReportsRoutingModule } from './reports.routing.module';
import { TabComponent } from './tab/tab.component';
import { ReportAComponent } from './reportA/reportA.component';
import { ToolsModule } from '../tools/tools.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ToolsModule,
    ReportsRoutingModule
  ],
  declarations: [
    TabComponent,
    ReportAComponent
  ]
})
export class ReportsModule { }
