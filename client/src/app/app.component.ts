import { Component } from '@angular/core';

import { AuthService } from './_services/auth.service';
import { AReport } from './_classes/report/a.report';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'STaxi';
  titleSmall = 'служба "Социальное такси"';
  aReport: AReport = new AReport();

  constructor(private authService: AuthService) {}
}
