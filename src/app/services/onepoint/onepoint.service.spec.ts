import { TestBed } from '@angular/core/testing';

import { OnepointService } from './onepoint.service';

describe('OnepointService', () => {
  let service: OnepointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnepointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
