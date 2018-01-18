import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from '../_services/auth-guard.service';

const usersRoutes: Routes = [
  {
    path: 'user',
    canActivate: [AuthGuard],
    children: [
      { path: 'list', component: UsersComponent },
      { path: '', component: UserComponent },
      { path: ':id', component: UserComponent }
    ]
  }
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
