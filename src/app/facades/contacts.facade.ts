import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ContactsRequest } from '../requests/contacts.request';
import { ContactModel } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactsFacade {
  constructor(private request: ContactsRequest) {}

  query(): Observable<ContactModel[]> {
    return this.request.query();
  }

  get(id: string): Observable<ContactModel> {
    return this.request.get(id);
  }

  create(contact: ContactModel): Observable<void> {
    return from(this.request.create(contact));
  }

  update(contact: ContactModel): Observable<void> {
    return from(this.request.update(contact));
  }

  delete(id: string): Observable<void> {
    return from(this.request.delete(id));
  }
}
