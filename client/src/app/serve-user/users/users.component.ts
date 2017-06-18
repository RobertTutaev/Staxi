import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../_classes/list/user';
import { UserService } from '../../_services/user.service';
import { SController } from '../../_classes/s.controller';

@Component({
  selector: 'user-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent extends SController implements OnInit {
  users: User[] = [];
  
  constructor(private userService: UserService,
              private router: Router) { super(); }
  
  ngOnInit() {
    this.userService.getUsers().then((users: User[]) => this.users = users);
  }

  onSelect(user: User) {
    this.router.navigate(['/user', user.id]);
  }

  onDelete(user: User) {
    if(confirm('Вы действительно хотите удалить текущую запись и все связанные с ней записи из базы данных?'))
      this.userService.delete(user.id)
        .then(() => {
            this.users = this.users.filter(c => c !== user);
          });
  }
}