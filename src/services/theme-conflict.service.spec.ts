import { TestBed } from '@angular/core/testing';

import { ThemeConflictService } from '../services/theme-conflict.service';

describe('ThemeConflictService', () => {
  let service: ThemeConflictService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeConflictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
