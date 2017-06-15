/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransportationService } from './transportation.service';

describe('TransportationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportationService]
    });
  });

  it('should ...', inject([TransportationService], (service: TransportationService) => {
    expect(service).toBeTruthy();
  }));
});
