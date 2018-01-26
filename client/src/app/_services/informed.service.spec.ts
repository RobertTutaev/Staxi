/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InformedService } from './informed.service';

describe('InformedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InformedService]
    });
  });

  it('should ...', inject([InformedService], (service: InformedService) => {
    expect(service).toBeTruthy();
  }));
});
