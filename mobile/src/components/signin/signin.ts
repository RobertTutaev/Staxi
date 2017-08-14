import { Component, OnInit } from '@angular/core';

import { User } from '../../_classes/list/user';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'signin',
  templateUrl: './signin.html',
  styleUrls: ['./signin.scss']
})

export class SigninComponent implements OnInit {
  user: User = new User();
  message: string;

  constructor(private authProvider: AuthProvider) { 
    this.setMessage();
  }

  ngOnInit() {
    if (!this.authProvider.isSignedIn) {      
      this.authProvider.isSign().then(() => this.goTo())
    }
  }

  setMessage() {
    this.message = 'Авторизация ' + (this.authProvider.isSignedIn ? 'выполнена' : 'не выполнена') + '!';
  }

  goTo() {
    if (this.authProvider.isSignedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authProvider.redirectUrl ? this.authProvider.redirectUrl : '/';

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
    
    this.authProvider.signin(this.user).then(() => {  
      this.setMessage();
      this.goTo();
    });
  }

  signout() {
    this.authProvider.signout().then(() => this.setMessage());
  }
}