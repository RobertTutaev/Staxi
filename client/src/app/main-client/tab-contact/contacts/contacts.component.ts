import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Type } from '../../../_classes/type';
import { TypeService } from '../../../_services/type.service';
import { Contact } from '../../../_classes/contact';
import { ContactService } from '../../../_services/contact.service';

@Component({
  selector: 'contact-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass']
})
export class ContactsComponent implements OnInit {
  types: Type[] = [];
  contacts: Contact[] = [];
  
  constructor(private typeService: TypeService,
              private contactService: ContactService,
              private route: ActivatedRoute,
              private router: Router,) { }
  
  ngOnInit() {
    this.typeService.getTypes().then((types: Type[]) => {
      this.types = types;
      this.route.params     
        .switchMap((params: Params) => this.contactService.getContacts(+params['id']))
        .subscribe((contacts: Contact[]) => this.contacts = contacts);
    })
  }

  onSelect(contact: Contact) {
    this.router.navigate(['/client/contact', contact.id]);
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
