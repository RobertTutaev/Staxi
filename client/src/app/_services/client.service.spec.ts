/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ClientService } from './client.service';
import { Client } from '../_classes/client';
import { Clients } from '../_mock/clients';

describe('ClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClientService,
        Clients,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should construct', async(inject(
    [ClientService, MockBackend], (service, mockBackend) => {
      expect(service).toBeDefined();
    })
  ));
});