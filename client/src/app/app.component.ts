import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { AuthService } from './_services/auth.service';
import { AReport } from './_classes/report/a.report';
import { InformedService } from './_services/informed.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'STaxi';
  titleSmall = 'служба "Социальное такси"';
  aReport: AReport = new AReport();

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private is: InformedService) {}

  ngOnInit() {
    this.is.getInformed()
      .subscribe((message: string) => this.openSnackBar(message));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 5000,
    });
  }
}
