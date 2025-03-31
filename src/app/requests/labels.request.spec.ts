import { TestBed } from '@angular/core/testing';

import { LabelsRequest } from './labels.request';

describe('LabelsRequest', () => {
  let service: LabelsRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelsRequest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
