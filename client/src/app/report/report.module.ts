import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReportRoutingModule } from './report.routing.module';
import { TabComponent } from './tab/tab.component';
import { AComponent } from './a/a.component';
import { ToolsModule } from '../tools/tools.module';

import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MaterialModule,
    MdNativeDateModule,
    FormsModule,
    ToolsModule,
    ReportRoutingModule
  ],
  declarations: [
    TabComponent,
    AComponent
  ]
})
export class ReportModule { }
