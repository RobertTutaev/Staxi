import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { User } from '../../_classes/list/user';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'auth-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})

export class SigninComponent implements OnInit {
  user: User = new User();
  message: string;

  constructor(private authService: AuthService,
              private router: Router) { 
                this.setMessage();
              }

  ngOnInit() {
    if (!this.authService.isSignedIn) {      
      this.authService.issign().then(() => this.goTo())
    }
  }

  setMessage() {
    this.message = 'Авторизация ' + (this.authService.isSignedIn ? 'выполнена' : 'не выполнена') + '!';
  }

  goTo() {
    if (this.authService.isSignedIn) {
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
  }

  signin() {
    this.message = 'Авторизация ...';
    
    this.authService.signin(this.user).then(() => {  
      this.setMessage();
      this.goTo();
    });
  }

  signout() {
    this.authService.signout().then(() => this.setMessage());
  }
}