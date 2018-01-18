import { Location } from '@angular/common';
import { Component} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

export class TController {
  id: number;

  constructor(private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.route.params.
      subscribe((params: Params) => {
          this.id = +params['id'];
        });
  }

  isActiveRoute(route: string [], useFullName = false) {
    const cur_route = route.join('/');
    let loc_route = this.location.path();

    if (!useFullName) {
      loc_route = loc_route.substr(0, cur_route.length);
    }

    return loc_route === cur_route;
  }
}
