import { TestBed } from '@angular/core/testing';

import { UsersRequest } from './users.request';

describe('UsersRequest', () => {
  let request: UsersRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    request = TestBed.inject(UsersRequest);
  });

  it('should be created', () => {
    expect(request).toBeTruthy();
  });
});
