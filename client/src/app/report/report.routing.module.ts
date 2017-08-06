import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabComponent } from './tab/tab.component';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';
import { CComponent } from './c/c.component';
import { AuthGuard } from '../_services/auth-guard.service';

const reportsRoutes: Routes = [
  { 
    path: 'report',
    canActivate: [AuthGuard],
    component: TabComponent,
    children: [

      { path: 'a/:firmId/:aDt/:bDt/:statusId/:withChilds/:getFile', component: AComponent },
      { path: 'b/:firmId/:aYear/:aMonth/:withChilds/:getFile', component: BComponent },
      { path: 'c/:carId/:aDt/:getFile', component: CComponent }

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
