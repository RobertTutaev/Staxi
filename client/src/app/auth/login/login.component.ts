import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
  notValidCredentials = false;

  constructor(private userService: UserService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {  }

  onSubmit() {  
    this.authService.login(this.user).then(success => {
      if (success) {
        this.router.navigateByUrl('/client/list');
      } else {
        this.notValidCredentials = true;
      }
    });
  }

  gotoBack() {
    this.location.back();
  }
}