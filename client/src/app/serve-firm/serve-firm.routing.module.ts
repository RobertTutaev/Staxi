import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FirmsComponent }    from './firms/firms.component';
import { FirmComponent }  from './firm/firm.component';
import { AuthGuard }    from './../_services/auth-guard.service';

const firmsRoutes: Routes = [
  { 
    path: 'firm',
    canActivate: [AuthGuard], 
    children: [
      { path: 'list', component: FirmsComponent },
      { path: '', component: FirmComponent },
      { path: ':id', component: FirmComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(firmsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ServeFirmRoutingModule { }
