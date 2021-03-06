import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { TRY_SIGNUP, TrySignup, SIGNUP, SET_TOKEN, TRY_SIGNIN, SIGNIN, LOGOUT } from './auth.actions';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(TRY_SIGNUP),
    map((action: TrySignup) => action.payload),
    switchMap((authData: { email: string, password: string }) => {
      const {email, password } = authData;
      return from(firebase.auth().createUserWithEmailAndPassword(email, password));
    }),
    switchMap(() => from(firebase.auth().currentUser.getIdToken())),
    mergeMap((token: string) => [{ type: SIGNUP }, { type: SET_TOKEN, payload: token }])
    );

  @Effect()
  authSignin = this.actions$.pipe(
    ofType(TRY_SIGNIN),
    map((action: TrySignup) => action.payload),
    switchMap((authData: { email: string, password: string }) => {
      const {email, password } = authData;
      return from(firebase.auth().signInWithEmailAndPassword(email, password));
    }),
    switchMap(() => from(firebase.auth().currentUser.getIdToken())),
    mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [{ type: SIGNIN }, { type: SET_TOKEN, payload: token }];
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(LOGOUT),
    tap(() => this.router.navigate(['/']))
  );

  constructor(private actions$: Actions, private router: Router) {}
}
