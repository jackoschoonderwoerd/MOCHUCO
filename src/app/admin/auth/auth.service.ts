import { Injectable } from '@angular/core';


import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { jsonEval } from '@firebase/util';
import { BehaviorSubject, from, map, Observable, pipe, tap } from 'rxjs';
import { User } from './user.model';

const AUTH_DATA = 'auth_data'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.isLoggedInSubject.asObservable()

  constructor(private auth: Auth) { }

  signUp(user: User) {
    console.log(user)
    createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  logIn(user: User) {
    console.log(user);
    return from(signInWithEmailAndPassword(this.auth, user.email, user.password))
      .pipe(
        tap((fireAuthUser: any) => {
          const user: User = {
            email: fireAuthUser.user.email
          }
          this.isLoggedInSubject.next(true);
          localStorage.setItem(AUTH_DATA, JSON.stringify(user));
        })
      )

  }
}
