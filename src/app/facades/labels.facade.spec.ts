import { TestBed } from '@angular/core/testing';

import { LabelsFacade } from './labels.facade';

describe('LabelFacade', () => {
  let service: LabelsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
