/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KategService } from './kateg.service';

describe('KategService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KategService]
    });
  });

  it('should ...', inject([KategService], (service: KategService) => {
    expect(service).toBeTruthy();
  }));
});
