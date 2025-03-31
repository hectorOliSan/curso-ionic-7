import { Injectable } from '@angular/core';
import { BehaviorSubject, map, shareReplay, take } from 'rxjs';
import { UserModel } from '../models/user.model';
import { UsersFacade } from '../facades/users.facade';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userSession$: BehaviorSubject<UserModel | undefined> =
    new BehaviorSubject<UserModel | undefined>(undefined);
  constructor(
    private usersFacade: UsersFacade,
    private fireAuth: AngularFireAuth
  ) {}

  getId(): string | undefined {
    return this.userSession$.getValue()?.id;
  }

  async signup(user: UserModel) {
    return new Promise(async (resolve, reject) => {
      try {
        const userAccount = await this.fireAuth.createUserWithEmailAndPassword(
          user.email,
          user.password?.toString() || '123456' // Default password
        );

        this.usersFacade
          .create({ ...user, id: userAccount.user?.uid })
          .pipe(take(1))
          .subscribe(() => {
            this.userSession$.next(user);
            this.setSession(user);
            resolve(true);
          });
      } catch (error) {
        // console.log(error);
        reject(error);
      }
    });
  }

  async login(email: string, password: string) {
    const loggedUser = await this.fireAuth.signInWithEmailAndPassword(
      email,
      password
    );

    // @ts-ignore
    const id = loggedUser.user.uid;
    return this.usersFacade.get(id).pipe(
      shareReplay(),
      map((user) => {
        this.userSession$.next(user);
        this.setSession(user);
        return user;
      })
    );
  }

  async updatePassword(
    email: string,
    currentPassword: string,
    newPassword: string
  ) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      currentPassword
    );
    const firebaseUser = await this.fireAuth.currentUser;

    await firebaseUser?.reauthenticateWithCredential(credential);
    await firebaseUser?.updatePassword(newPassword);

    await this.updateLoggedUser()
  }

  async resetPassword(email: string) {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  async updateLoggedUser() {
    const id = this.getId();
    if (!id) return;

    return this.usersFacade.get(id).pipe(
      shareReplay(),
      map((user) => {
        this.userSession$.next(user);
        this.setSession(user);
        return user;
      })
    );
  }

  logout() {
    this.userSession$.next(undefined);
    localStorage.removeItem('user');
  }

  private setSession(user: UserModel) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
