import { TestBed } from '@angular/core/testing';

import { RasturantService } from './rasturant.service';

describe('RasturantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RasturantService = TestBed.get(RasturantService);
    expect(service).toBeTruthy();
  });
});
