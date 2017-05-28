import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactsComponent }    from './contacts/contacts.component';
import { ContactComponent }  from './contact/contact.component';

const contactsRoutes: Routes = [
  { path: 'contact/list',  component: ContactsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'contact/:id', component: ContactComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(contactsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainContactRoutingModule { }
