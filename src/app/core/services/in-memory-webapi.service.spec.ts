import { TestBed } from '@angular/core/testing';

import { InMemoryWebapiService } from './in-memory-webapi.service';

describe('InMemoryWebapiService', () => {
  let service: InMemoryWebapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryWebapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
