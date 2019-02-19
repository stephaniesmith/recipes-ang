import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { TRY_SIGNUP, TrySignup, SIGNUP, SET_TOKEN, TRY_SIGNIN, SIGNIN } from './auth.actions';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { from } from 'rxjs';

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
    mergeMap((token: string) => [{ type: SIGNIN }, { type: SET_TOKEN, payload: token }])
  );

  constructor(private actions$: Actions) {}
}
