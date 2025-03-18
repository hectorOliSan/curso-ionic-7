import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map, Observable } from 'rxjs';
import { NetworkService } from '../services/network.service';
import { CachingService } from '../services/caching.service';

@Injectable({
  providedIn: 'root',
})
export class PostsRequest {
  private baseUrl: string = 'api/posts';

  constructor(
    private http: HttpClient,
    private networkSvc: NetworkService,
    private cachingSvc: CachingService
  ) {}

  public query(): Observable<any> {
    if (this.networkSvc.internetConnected.getValue()) {
      return this.http.get(this.baseUrl).pipe(
        map(async (response) => {
          this.cachingSvc.cacheRequest(this.baseUrl, 'get', response);
          return response;
        })
      );
    }

    return from(this.cachingSvc.getCachedRequest(this.baseUrl, 'get'));
  }

  public get(id: number): Observable<any> {
    // return this.http.get(`${this.baseUrl}/${id}`);

    if (this.networkSvc.internetConnected.getValue()) {
      return this.http.get(`${this.baseUrl}/${id}`).pipe(
        map((response) => {
          this.cachingSvc.cacheRequest(
            `${this.baseUrl}/${id}`,
            'get',
            response
          );
          return response;
        })
      );
    }
    return from(
      this.cachingSvc.getCachedRequest(`${this.baseUrl}/${id}`, 'get')
    );
  }

  public create(post: any): Observable<any> {
    return this.http.post(this.baseUrl, post);
  }

  public update(post: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${post?.id}`, { ...post });
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
