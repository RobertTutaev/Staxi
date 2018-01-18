import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Contact } from '../../_classes/list/contact';
import { ContactService } from '../../_services/contact.service';
import { SController } from '../../_classes/s.controller';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass']
})
export class ContactsComponent extends SController implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService,
              private route: ActivatedRoute,
              private router: Router) { super(); }

  ngOnInit() {
    this.route.parent.parent.params
        .switchMap((params: Params) => this.contactService.getContacts(+params['id']))
        .subscribe((contacts: Contact[]) => this.contacts = contacts);
  }

  onSelect(contact: Contact) {
    this.router.navigate(['../', contact.id], { relativeTo: this.route });
  }

  onDelete(contact: Contact) {
    if (confirm('Вы действительно хотите удалить текущую запись?')) {
      this.contactService.delete(contact.id)
        .then((res: any) => res.rslt ? this.contacts = this.contacts.filter(k => k !== contact) : null);
    }
  }
}
