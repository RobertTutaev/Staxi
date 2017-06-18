import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Type } from '../../_classes/list/type';
import { TypeService } from '../../_services/type.service';
import { Contact } from '../../_classes/list/contact';
import { ContactService } from '../../_services/contact.service';
import { SController } from '../../_classes/s.controller';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass']
})
export class ContactsComponent extends SController implements OnInit {
  types: Type[] = [];
  contacts: Contact[] = [];
  
  constructor(private typeService: TypeService,
              private contactService: ContactService,
              private route: ActivatedRoute,
              private router: Router) { super(); }
  
  ngOnInit() {
    this.typeService.getTypes().then((types: Type[]) => {
      this.types = types;
      this.route.parent.parent.params
        .switchMap((params: Params) => this.contactService.getContacts(+params['id']))
        .subscribe((contacts: Contact[]) => this.contacts = contacts);
    })
  }

  onSelect(contact: Contact) {
    this.router.navigate(['../', contact.id], { relativeTo: this.route });
  }

  getTypeStyle(contact: Contact): string {
    return this.types.find(myObj => myObj.id === contact.type_id).style;
  }
 
  onDelete(contact: Contact) {
    if(confirm('Вы действительно хотите удалить текущую запись и все связанные с ней записи из базы данных?'))
      this.contactService.delete(contact.id)
        .then(() => {
            this.contacts = this.contacts.filter(c => c !== contact);
          });
  }
}