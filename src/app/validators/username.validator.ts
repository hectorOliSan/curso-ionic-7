import { Injectable } from '@angular/core';

import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';

import { map, Observable } from 'rxjs';

import { UsersFacade } from '../facades/users.facade';

@Injectable({
  providedIn: 'root',
})
export class UsernameValidator {
  
  static usernameExists(
    controlName: string,
    usersFacade: UsersFacade
  ): AsyncValidatorFn {
    return (
      formGroup: AbstractControl
    ): Observable<ValidationErrors | null> => {
      const email = formGroup.get(controlName)?.value;
      return usersFacade
        .checkUserExists(email)
        .pipe(
          map((result: boolean) => (result ? { usernameExists: true } : null))
        );
    };
  }

  constructor() {}
}
