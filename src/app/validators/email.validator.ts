import { Injectable } from '@angular/core';

import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';

import { first, map, Observable, of, switchMap } from 'rxjs';

import { UsersFacade } from '../facades/users.facade';

@Injectable({
  providedIn: 'root',
})
export class EmailValidator {
  static emailExists(usersFacade: UsersFacade): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return usersFacade.checkUserExists(control.value).pipe(
        map((exists) => (exists ? { emailExists: true } : null)),
        first()
      );
    };
  }

  static emailNotExists(usersFacade: UsersFacade): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return usersFacade.checkUserExists(control.value).pipe(
        map((exists) => (!exists ? { emailNotExists: true } : null)),
        first()
      );
    };
  }

  constructor() {}
}
