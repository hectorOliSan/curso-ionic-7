import { Injectable } from '@angular/core';
import { PostsRequest } from '../requests/posts.request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsFacade {
  constructor(private request: PostsRequest) {}

  query(): Observable<any>  {
    return this.request.query();
  }

  get(id: number): Observable<any>  {
    return this.request.get(id);
  }

  create(post: any): Observable<any>  {
    return this.request.create(post);
  }

  update(post: any): Observable<any>  {
    return this.request.update(post);
  }

  delete(id: number): Observable<any>  {
    return this.request.delete(id);
  }
}
