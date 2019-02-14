import { State as ShoppingListState, shoppingListReducer } from '../shopping-list/store/shopping-list.reducers';
import { State as AuthState, authReducer } from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: ShoppingListState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer
};
