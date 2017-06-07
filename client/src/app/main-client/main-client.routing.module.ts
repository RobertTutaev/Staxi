import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsComponent } from './clients/clients.component';
import { TabComponent } from './tab/tab.component';
import { TabClientComponent } from './tab-client/tab-client.component';
import { TabContactComponent } from './tab-contact/tab-contact.component';
import { ContactComponent }  from './contact/contact.component';
import { ContactsComponent }  from './contacts/contacts.component';
import { TabKategoryComponent } from './tab-kategory/tab-kategory.component';
import { TabTransportationComponent } from './tab-transportation/tab-transportation.component';

const clientsRoutes: Routes = [
  { path: 'client/list',  component: ClientsComponent },
  { path: 'client', component: TabComponent, children: [

      { path: '', component: TabClientComponent }

    ]
  },
  { path: 'client/:id', component: TabComponent, children: [

      { path: '', component: TabClientComponent },
      { path: 'contact', component: TabContactComponent, children: [
          
          { path: 'list', component: ContactsComponent },
          { path: ':idc', component: ContactComponent },
          { path: '', component: ContactComponent }

        ]  
      },
      { path: 'kategory', component: TabKategoryComponent },
      { path: 'Transportation', component: TabTransportationComponent }
    ]
  }  
];

@NgModule({
  imports: [
    RouterModule.forChild(clientsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainClientRoutingModule { }
