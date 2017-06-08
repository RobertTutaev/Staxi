/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KategoryService } from './kategory.service';

describe('KategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KategoryService]
    });
  });

  it('should ...', inject([KategoryService], (service: KategoryService) => {
    expect(service).toBeTruthy();
  }));
});
