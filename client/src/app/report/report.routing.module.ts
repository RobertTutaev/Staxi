import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabComponent } from './tab/tab.component';
import { AComponent } from './a/a.component';
import { AuthGuard } from '../_services/auth-guard.service';

const reportsRoutes: Routes = [
  { 
    path: 'report',
    canActivate: [AuthGuard],
    component: TabComponent,
    children: [

      { path: 'a', component: AComponent }

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
export class ReportRoutingModule { }
