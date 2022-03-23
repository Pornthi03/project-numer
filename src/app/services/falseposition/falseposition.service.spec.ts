import { TestBed } from '@angular/core/testing';

import { FalsepositionService } from './falseposition.service';

describe('FalsepositionService', () => {
  let service: FalsepositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FalsepositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
