import { TestBed } from '@angular/core/testing';

import { UsernameValidator } from './username.validator';

describe('UsernameValidator', () => {
  let service: UsernameValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsernameValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
