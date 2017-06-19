import { InMemoryDbService, InMemoryBackendConfigArgs } from 'angular-in-memory-web-api';

import { Transportations } from './transportations';
import { Categories } from './categories';
import { Contacts } from './contacts';
import { Clients } from './clients';
import { Types } from './types';
import { Cars } from './cars';
import { Docs } from './docs';
import { Firms } from './firms';
import { Punkts } from './punkts';
import { Streets } from './streets';
import { Territories } from './territories';
import { Kategs } from './kategs';
import { Users } from './Users';

export class InMemoryDataService implements InMemoryDbService {  

  createDb() {
    let transportation = Transportations;
    let category = Categories;
    let contact = Contacts;
    let user = Users;
    let client = Clients;
    let street = Streets;
    let territory = Territories;
    let kateg = Kategs;
    let punkt = Punkts;
    let firm = Firms;
    let doc = Docs;
    let car = Cars;
    let type = Types;
    
    return { 
      transportation, 
      category, 
      client, 
      street, 
      territory, 
      kateg, 
      punkt, 
      firm, 
      doc, 
      car, 
      type, 
      user, 
      contact
    };
  }
}