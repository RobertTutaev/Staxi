import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tab-contact',
  templateUrl: './tab-contact.component.html',
  styleUrls: ['./tab-contact.component.sass']
})
export class TabContactComponent implements OnInit {

  @Input()
  id: number;

  constructor() { }

  ngOnInit() {
  }

}