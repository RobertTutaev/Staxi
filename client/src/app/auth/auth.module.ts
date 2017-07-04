import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { AuthRoutingModule } from './auth.routing.module';
import { UserService } from '../_services/user.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../_services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [ UserService, AuthService ]
})
export class AuthModule { }
