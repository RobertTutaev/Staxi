import 'rxjs/add/operator/switchMap';
import { Location }               from '@angular/common';

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Type } from '../../_classes/type';
import { TypeService } from '../../_services/type.service';
import { Contact } from '../../_classes/contact';
import { ContactService } from '../../_services/contact.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {  
  selectedType: Type = new Type();
  types: Type[] = [];
  contact: Contact = new Contact();
  
  constructor(private typeService: TypeService,
              private contactService: ContactService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }
  
  ngOnInit() {
    this.typeService.getTypes().then((types: Type[]) => {
        this.types = types;
        this.route.params     
          .switchMap((params: Params) => this.contactService.getContact(+params['idc']))
          .subscribe((contact: Contact) => {
            this.contact = contact;
            this.selectedType = this.types.find(myObj => myObj.id === this.contact.type_id);            
          });
      });    
  }

  onSubmit() {
    this.route.parent.parent.params
      .subscribe((params: Params) => {
        const client_id = +params['id'];

        if (this.contact.id) {
          if (this.contact.client_id === client_id)
            this.contactService.update(this.contact)
              .then(() => this.gotoBack())
          else
            this.gotoBack();
        }
        else {
          this.contact.client_id = client_id;
          this.contactService.create(this.contact)
            .then(() => this.gotoBack());
        }
      });
  }

  get selectedTypeId(): number {
    return this.contact.type_id;
  }

  set selectedTypeId(value: number) {
    if(value) {
      this.selectedType = this.types.find(myObj => myObj.id === value);
      this.contact.type_id = value;
    }    
  } 

  gotoBack() {
    this.location.back();
  }
}