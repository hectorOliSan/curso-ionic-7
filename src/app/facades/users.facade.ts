import { Injectable } from '@angular/core';
import { UsersRequest } from '../requests/users.request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  constructor(private request: UsersRequest) {}

  query(): Observable<any> {
    return this.request.query();
  }

  get(id: number): Observable<any> {
    return this.request.get(id);
  }

  create(user: any): Observable<any> {
    return this.request.create(user);
  }

  checkUserExists(email: string): Observable<boolean> {
    return this.request.checkUserExists(email);
  }

  // signup(email: string, password: string): Observable<any>  {
  //   return this.request.signup({email, password});
  // }

  login(email: string, password: string): Observable<any> {
    return this.request.login(email, password);
  }

  update(user: any): Observable<any> {
    return this.request.update(user);
  }

  delete(id: number): Observable<any> {
    return this.request.delete(id);
  }
}
