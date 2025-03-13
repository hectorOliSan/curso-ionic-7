import { TestBed } from '@angular/core/testing';

import { PostsRequestService } from './posts.request';

describe('PostsRequestService', () => {
  let service: PostsRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
