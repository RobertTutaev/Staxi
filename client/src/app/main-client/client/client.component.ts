import 'rxjs/add/operator/switchMap';
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent {
  id: number;
  
  constructor(private route: ActivatedRoute,
              private router: Router) { }
  
  ngOnInit() {
    this.route.params.
      subscribe((params: Params) => {
          this.id = +params['id'];
        });
  }
}