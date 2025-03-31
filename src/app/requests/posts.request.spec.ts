import { TestBed } from '@angular/core/testing';

import { PostsRequest } from './posts.request';

describe('PostsRequest', () => {
  let service: PostsRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsRequest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
