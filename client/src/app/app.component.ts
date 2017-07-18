import { Component } from '@angular/core';

import { AuthService } from './_services/auth.service';
import { Report } from './_classes/report';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'STaxi';
  titleSmall = 'служба "Социальное такси"';
  report: Report = new Report();
  
  constructor(private authService: AuthService) {}
}