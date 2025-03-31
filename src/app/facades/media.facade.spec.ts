import { TestBed } from '@angular/core/testing';

import { MediaFacade } from './media.facade';

describe('MediaFacade', () => {
  let service: MediaFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
