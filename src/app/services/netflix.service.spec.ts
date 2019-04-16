import { TestBed } from '@angular/core/testing';

import { NetflixService } from './netflix.service';

describe('NetflixService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetflixService = TestBed.get(NetflixService);
    expect(service).toBeTruthy();
  });
});
