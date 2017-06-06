import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Type } from '../../_classes/type';
import { TypeService } from '../../_services/type.service';
import { Contact } from '../../_classes/contact';
import { ContactService } from '../../_services/contact.service';

@Component({
  selector: 'tab-contacts',
  templateUrl: './tab-contacts.component.html',
  styleUrls: ['./tab-contacts.component.sass']
})
export class TabContactsComponent implements OnInit {
  id: number;
  types: Type[] = [];
  contacts: Contact[] = [];
  
  constructor(private typeService: TypeService,
              private contactService: ContactService,
              private route: ActivatedRoute,
              private router: Router) { }
  
  ngOnInit() {
    this.typeService.getTypes().then((types: Type[]) => {
      this.types = types;
      this.route.params   
        .switchMap((params: Params) => {
            this.id = +params['id'];
            return this.contactService.getContacts(+params['idc']);
          })
        .subscribe((contacts: Contact[]) => this.contacts = contacts);
    })
  }

  onSelect(contact: Contact) {
    this.router.navigate(['/client', this.id, 'contact', contact.id]);
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