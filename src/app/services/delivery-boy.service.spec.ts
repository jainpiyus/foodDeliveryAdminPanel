import { TestBed } from '@angular/core/testing';

import { DeliveryBoyService } from './delivery-boy.service';

describe('DeliveryBoyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeliveryBoyService = TestBed.get(DeliveryBoyService);
    expect(service).toBeTruthy();
  });
});
