import { TestBed } from '@angular/core/testing';

import { BisectionService } from './bisection.service';

describe('BisectionService', () => {
  let service: BisectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BisectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
