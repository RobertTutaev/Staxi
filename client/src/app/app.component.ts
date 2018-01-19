import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

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

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar) {}

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 5000,
    });
  }
}
