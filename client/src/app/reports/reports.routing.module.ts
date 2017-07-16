import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabComponent } from './tab/tab.component';
import { ReportAComponent } from './reportA/reportA.component';
import { AuthGuard } from '../_services/auth-guard.service';

const reportsRoutes: Routes = [
  { 
    path: 'reports',
    canActivate: [AuthGuard],
    component: TabComponent,
    children: [

      { path: 'a', component: ReportAComponent }

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(reportsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]

})
export class ReportsRoutingModule { }
