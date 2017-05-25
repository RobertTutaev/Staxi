/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DocService } from './doc.service';

describe('DocService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocService]
    });
  });

  it('should ...', inject([DocService], (service: DocService) => {
    expect(service).toBeTruthy();
  }));
});
