/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PunktService } from './punkt.service';

describe('PunktService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PunktService]
    });
  });

  it('should ...', inject([PunktService], (service: PunktService) => {
    expect(service).toBeTruthy();
  }));
});
