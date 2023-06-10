import { TestBed } from '@angular/core/testing';

import { NetworkHandlingService } from './network-handling.service';

describe('NetworkHandlingService', () => {
  let service: NetworkHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
