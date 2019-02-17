import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { TRY_SIGNUP, TrySignup, SIGNUP, SET_TOKEN } from './auth.actions';
import { Observable, from } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import * as firebase from 'firebase';

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

  constructor(private actions$: Actions) {}
}
