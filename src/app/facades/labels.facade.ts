import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { LabelsRequest } from '../requests/labels.request';
import { LabelModel } from '../models/label.model';

@Injectable({
  providedIn: 'root',
})
export class LabelsFacade {
  constructor(private request: LabelsRequest) {}

  query(): Observable<LabelModel[]> {
    return this.request.query();
  }

  get(id: string): Observable<LabelModel> {
    return this.request.get(id);
  }

  create(label: LabelModel): Observable<void> {
    return from(this.request.create(label));
  }

  update(label: LabelModel): Observable<void> {
    return from(this.request.update(label));
  }

  delete(id: string): Observable<void> {
    return from(this.request.delete(id));
  }
}
