import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { firstValueFrom, map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docSnapshots,
  Firestore,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersRequest {
  // private baseUrl: string = `${environment.reqres.baseUrl}`;
  private COLLECTION: string = 'users';

  constructor(private http: HttpClient, private firestore: Firestore) {}

  query(): Observable<any> {
    const usersCollection = collection(this.firestore, this.COLLECTION);
    return collectionData(usersCollection, { idField: 'id' }).pipe(
      map((user) => user as UserModel[])
    );
  }

  get(id: string): Observable<any> {
    const document = doc(this.firestore, `${this.COLLECTION}/${id}`);
    return docSnapshots(document).pipe(
      map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as UserModel;
      })
    );
  }

  public create(user: any) {
    const usersCollection = collection(this.firestore, this.COLLECTION);
    return addDoc(usersCollection, user);
  }

  public checkUserExists(email: string): Observable<boolean> {
    const usersCollection = collection(this.firestore, this.COLLECTION);
    const q = query(usersCollection, where('email', '==', email));

    return collectionData(q, { idField: 'id' }).pipe(
      map((user) => user.length > 0)
    );
  }

  public update(user: any) {
    const document = doc(this.firestore, `${this.COLLECTION}/${user.id!}`);
    const { id, ...data } = user;
    return setDoc(document, data);
  }

  public delete(id: number) {
    const document = doc(this.firestore, `${this.COLLECTION}/${id.toString()}`);
    return deleteDoc(document);
  }
}
