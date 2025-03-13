import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, asyncScheduler, scheduled } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersRequest {
  // private baseUrl: string = 'api/users';
  private baseUrl: string = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  public query(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  public get(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  public create(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  public checkUserExists(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`, {
      params: {
        email,
      },
    });
  }

  // public signup(user: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/register`, { ...user });
  // }

  public login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth`, {
      email,
      password,
    });
  }

  public update(user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${user?.id}`, { ...user });
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }
}
