import { Component } from '@angular/core';

import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'STaxi';
  titleSmall = 'служба "Социальное такси"';

  constructor(private authService: AuthService) {}
}