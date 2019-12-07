import { TestBed } from '@angular/core/testing';

import { DelayInterceptorService } from './delay-interceptor.service';

describe('DelayInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DelayInterceptorService = TestBed.get(DelayInterceptorService);
    expect(service).toBeTruthy();
  });
});
