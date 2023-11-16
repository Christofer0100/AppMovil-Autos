import { TestBed } from '@angular/core/testing';

import { GuardiaGuard } from './access.guard';

describe('AccessGuard', () => {
  let guard: GuardiaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardiaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
