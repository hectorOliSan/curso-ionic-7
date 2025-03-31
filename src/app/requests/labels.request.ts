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
import { LabelModel } from '../models/label.model';

@Injectable({
  providedIn: 'root',
})
export class LabelsRequest {
  private COLLECTION: string = 'labels';

  constructor(
    private networkSvc: NetworkService,
    private cachingSvc: CachingService,
    private firestore: Firestore
  ) {}

  query(): Observable<any> {
    if (this.networkSvc.internetConnected.getValue()) {
      const coleccion = collection(this.firestore, this.COLLECTION);
      return collectionData(coleccion, { idField: 'id' }).pipe(
        map((respuesta) => {
          this.cachingSvc.cacheRequest(this.COLLECTION, 'get', respuesta);
          return respuesta as LabelModel[];
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
          const resultado = { id, ...data } as LabelModel;
          this.cachingSvc.cacheRequest(
            `${this.COLLECTION}/${id}`,
            'get',
            resultado
          );
          return resultado;
        })
      );
    }
    return from(
      this.cachingSvc.getCachedRequest(`${this.COLLECTION}/${id}`, 'get')
    );
  }

  create(label: LabelModel) {
    const document = doc(collection(this.firestore, this.COLLECTION));
    return setDoc(document, label);
  }

  update(label: any) {
    const document = doc(this.firestore, `${this.COLLECTION}/${label.id!}`);
    const { id, ...data } = label;
    return setDoc(document, data);
  }

  delete(id: string) {
    const document = doc(this.firestore, `${this.COLLECTION}/${id}`);
    return deleteDoc(document);
  }
}
