import { TestBed } from '@angular/core/testing';

import { EmailValidator } from './email.validator';

describe('EmailValidator', () => {
  let service: EmailValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
