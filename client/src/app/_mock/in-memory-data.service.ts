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
import { Users } from './users';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const transportation = Transportations;
    const category = Categories;
    const contact = Contacts;
    const user = Users;
    const client = Clients;
    const street = Streets;
    const territory = Territories;
    const kateg = Kategs;
    const punkt = Punkts;
    const firm = Firms;
    const doc = Docs;
    const car = Cars;
    const type = Types;

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
    }
  }
}
