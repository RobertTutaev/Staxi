import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReportRoutingModule } from './report.routing.module';
import { TabComponent } from './tab/tab.component';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';
import { CComponent } from './c/c.component';
import { ToolsModule } from '../tools/tools.module';
import { ReportService } from '../_services/report.service';

@NgModule({
  imports: [
    ToolsModule,
    CommonModule,    
    FormsModule,    
    ReportRoutingModule
  ],
  declarations: [
    TabComponent,
    AComponent,
    BComponent,
    CComponent
  ],
  providers: [
    ReportService
  ]
})
export class ReportModule { }
