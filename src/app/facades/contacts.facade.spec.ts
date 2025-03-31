import { TestBed } from '@angular/core/testing';

import { ContactsFacade } from './contacts.facade';

describe('LabelFacade', () => {
  let service: ContactsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
