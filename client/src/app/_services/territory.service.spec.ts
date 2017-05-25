/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TerritoryService } from './territory.service';

describe('TerritoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TerritoryService]
    });
  });

  it('should ...', inject([TerritoryService], (service: TerritoryService) => {
    expect(service).toBeTruthy();
  }));
});
