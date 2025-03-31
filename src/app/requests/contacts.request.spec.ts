import { TestBed } from '@angular/core/testing';

import { ContactsRequest } from './contacts.request';

describe('ContactsRequest', () => {
  let service: ContactsRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsRequest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
