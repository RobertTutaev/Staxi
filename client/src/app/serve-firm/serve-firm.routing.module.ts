import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FirmsComponent }    from './firms/firms.component';
import { FirmComponent }  from './firm/firm.component';

const firmsRoutes: Routes = [
  { path: 'firm/list',  component: FirmsComponent },
  { path: 'firm', component: FirmComponent },
  { path: 'firm/:id', component: FirmComponent }
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
