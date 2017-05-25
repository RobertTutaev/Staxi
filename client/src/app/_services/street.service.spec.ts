/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StreetService } from './street.service';

describe('StreetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StreetService]
    });
  });

  it('should ...', inject([StreetService], (service: StreetService) => {
    expect(service).toBeTruthy();
  }));
});
