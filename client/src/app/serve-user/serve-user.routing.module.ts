import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent }    from './users/users.component';
import { UserComponent }  from './user/user.component';

const usersRoutes: Routes = [
  { path: 'user/list',  component: UsersComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ServeUserRoutingModule { }
