import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocsComponent }    from './docs/docs.component';
import { DocComponent }  from './doc/doc.component';
import { AuthGuard }    from './../_services/auth-guard.service';

const docsRoutes: Routes = [
  { 
    path: 'doc',
    canActivate: [AuthGuard], 
    children: [
      { path: 'list', component: DocsComponent },
      { path: '', component: DocComponent },
      { path: ':id', component: DocComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(docsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ServeDocRoutingModule { }
