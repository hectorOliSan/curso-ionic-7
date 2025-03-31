import { Injectable } from '@angular/core';
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
import { MediaModel } from '../models/media.model';

@Injectable({
  providedIn: 'root',
})
export class MediaRequest {
  private COLLECTION: string = 'media';

  constructor(
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
          return response as MediaModel[];
        })
      );
    }
    return from(this.cachingSvc.getCachedRequest(this.COLLECTION, 'get'));
  }

  get(id: string): Observable<any> {
    if (this.networkSvc.internetConnected.getValue()) {
      const document = doc(this.firestore, `${this.COLLECTION}/${id}`);
      return docSnapshots(document).pipe(
        map((doc) => {
          const id = doc.id;
          const data = doc.data();
          const result = { id, ...data } as MediaModel;
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

  create(media: MediaModel) {
    const document = doc(collection(this.firestore, this.COLLECTION));
    return setDoc(document, media);
  }

  update(media: any) {
    const document = doc(this.firestore, `${this.COLLECTION}/${media.id!}`);
    const { id, ...data } = media;
    return setDoc(document, data);
  }

  delete(id: string) {
    const document = doc(this.firestore, `${this.COLLECTION}/${id}`);
    return deleteDoc(document);
  }
}
