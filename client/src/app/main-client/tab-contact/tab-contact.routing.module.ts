import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactsComponent }    from './contacts/contacts.component';
import { ContactComponent }  from './contact/contact.component';

const contactsRoutes: Routes = [
  { path: 'client/contact/list/:id',  component: ContactsComponent },
  { path: 'client/contact', component: ContactComponent },
  { path: 'client/contact/:id', component: ContactComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(contactsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TabContactRoutingModule { }