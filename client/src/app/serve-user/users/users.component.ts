import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Firm } from '../../_classes/firm';
import { FirmService } from '../../_services/firm.service';
import { User } from '../../_classes/user';
import { UserService } from '../../_services/user.service';
import { SController } from '../../_classes/s.controller';

@Component({
  selector: 'user-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent extends SController implements OnInit {
  firms: Firm[] = [];
  users: User[] = [];
  
  constructor(private raionService: FirmService,
              private userService: UserService,
              private router: Router) { super(); }
  
  ngOnInit() {
    this.raionService.getFirms().then((firms: Firm[]) => {
        this.firms = firms;
        this.userService.getUsers().then((users: User[]) => this.users = users);
      });
  }

  onSelect(user: User) {
    this.router.navigate(['/user', user.id]);
  }

  getFirmName(user: User): string {
    return this.firms.find(myObj => myObj.id === user.firm_id).name;
  }

  onDelete(user: User) {
    if(confirm('Вы действительно хотите удалить текущую запись и все связанные с ней записи из базы данных?'))
      this.userService.delete(user.id)
        .then(() => {
            this.users = this.users.filter(c => c !== user);
          });
  }
}