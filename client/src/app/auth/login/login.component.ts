import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { User } from '../../_classes/list/user';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {
  user: User = new User();
  message: string;

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) { 
                this.setMessage();
              }

  ngOnInit() {  }

  setMessage() {
    this.message = 'Авторизация ' + (this.authService.isLoggedIn ? 'выполнена' : 'не выполнена') + '!';
  }

  login() {
    this.message = 'Авторизация ...';

    this.authService.login(this.user).then(() => {
      this.setMessage();

      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';

        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}