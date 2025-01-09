import { TestBed } from '@angular/core/testing';

import { BookingstateService } from './bookingstate.service';

describe('BookingstateService', () => {
  let service: BookingstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
