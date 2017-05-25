import { InMemoryDbService, InMemoryBackendConfigArgs } from 'angular-in-memory-web-api';

import { Clients } from './clients';
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
    let users = Users;
    let clients = Clients;
    let streets = Streets;
    let territories = Territories;
    let kategs = Kategs;
    let punkts = Punkts;
    let firms = Firms;
    let docs = Docs;
    let cars = Cars;
    
    return { clients, streets, territories, kategs, punkts, firms, docs, cars, users };
  }
}