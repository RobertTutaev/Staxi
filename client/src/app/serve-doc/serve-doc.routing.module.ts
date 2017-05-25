import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocsComponent }    from './docs/docs.component';
import { DocComponent }  from './doc/doc.component';

const docsRoutes: Routes = [
  { path: 'doc/list',  component: DocsComponent },
  { path: 'doc', component: DocComponent },
  { path: 'doc/:id', component: DocComponent }
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
