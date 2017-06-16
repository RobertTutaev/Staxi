import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsComponent } from './clients/clients.component';
import { TabComponent } from './tab/tab.component';
import { ClientComponent } from './client/client.component';
import { ContactComponent }  from './contact/contact.component';
import { ContactsComponent }  from './contacts/contacts.component';
import { KategoryComponent }  from './kategory/kategory.component';
import { KategoriesComponent }  from './kategories/kategories.component';
import { TransportationComponent }  from './transportation/transportation.component';
import { TransportationsComponent }  from './transportations/transportations.component';

const clientsRoutes: Routes = [
  { path: 'client/list',  component: ClientsComponent },
  { path: 'client', component: TabComponent, children: [

      { path: '', component: ClientComponent }

    ]
  },
  { path: 'client/:id', component: TabComponent, children: [

      { path: '', component: ClientComponent },
      { path: 'contact', children: [
          
          { path: 'list', component: ContactsComponent },
          { path: ':idc', component: ContactComponent },
          { path: '', component: ContactComponent }

        ]
      },
      { path: 'kategory', children: [
          
          { path: 'list', component: KategoriesComponent },
          { path: ':idc', component: KategoryComponent },
          { path: '', component: KategoryComponent }

        ]
      },
      { path: 'transportation', children: [
          
          { path: 'list', component: TransportationsComponent },
          { path: ':idc', component: TransportationComponent },
          { path: '', component: TransportationComponent }

        ]
      }
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
export class MainRoutingModule { }
