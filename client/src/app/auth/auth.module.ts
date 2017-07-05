import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { AuthRoutingModule } from './auth.routing.module';
import { UserService } from '../_services/user.service';
import { SigninComponent } from './signin/signin.component';
import { AuthService } from '../_services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  declarations: [
    SigninComponent
  ],
  providers: [ UserService, AuthService ]
})
export class AuthModule { }
