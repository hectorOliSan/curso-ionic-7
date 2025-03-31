import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

import { from, map, Observable } from 'rxjs';

import { NetworkService } from '../services/network.service';
import { CachingService } from '../services/caching.service';

import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docSnapshots,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { PostModel } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsRequest {
  // private baseUrl: string = 'api/posts';
  private COLLECTION: string = 'posts';

  constructor(
    // private http: HttpClient,
    private networkSvc: NetworkService,
    private cachingSvc: CachingService,
    private firestore: Firestore
  ) {}

  query(): Observable<any> {
    if (this.networkSvc.internetConnected.getValue()) {
      const coleccion = collection(this.firestore, this.COLLECTION);
      return collectionData(coleccion, { idField: 'id' }).pipe(
        map((response) => {
          this.cachingSvc.cacheRequest(this.COLLECTION, 'get', response);
          return response as PostModel[];
        })
      );
    }
    return from(this.cachingSvc.getCachedRequest(this.COLLECTION, 'get'));
  }

  createId(): string {
    return doc(collection(this.firestore, '_')).id;
  }

  get(id: string): Observable<any> {
    if (this.networkSvc.internetConnected.getValue()) {
      const document = doc(this.firestore, `${this.COLLECTION}/${id}`);
      return docSnapshots(document).pipe(
        map((doc) => {
          const id = doc.id;
          const data = doc.data();
          const result = { id, ...data } as PostModel;
          this.cachingSvc.cacheRequest(
            `${this.COLLECTION}/${id}`,
            'get',
            result
          );
          return result;
        })
      );
    }
    return from(
      this.cachingSvc.getCachedRequest(`${this.COLLECTION}/${id}`, 'get')
    );
  }

  public create(post: any) {
    const document = doc(collection(this.firestore, this.COLLECTION));
    return setDoc(document, post);
  }

  public update(post: any) {
    const document = doc(this.firestore, `${this.COLLECTION}/${post.id!}`);
    const { id, ...data } = post;
    return setDoc(document, data);
  }

  public delete(id: string) {
    const document = doc(this.firestore, `${this.COLLECTION}/${id}`);
    return deleteDoc(document);
  }
}
