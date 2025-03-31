import { Injectable } from '@angular/core';
import { UsersRequest } from '../requests/users.request';
import { from, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  constructor(private request: UsersRequest) {}

  query(): Observable<UserModel[]> {
    return this.request.query();
  }

  get(id: string): Observable<UserModel> {
    return this.request.get(id);
  }

  create(user: any) {
    return from(this.request.update(user));
  }

  checkUserExists(email: string): Observable<boolean> {
    return this.request.checkUserExists(email);
  }

  update(user: any) {
    return this.request.update(user);
  }

  delete(id: number) {
    return from(this.request.delete(id));
  }
}
