import { State as ShoppingListState } from '../shopping-list/store/shopping-list.reducers';
import { State as AuthState } from '../auth/store/auth.reducer';

export interface AppState {
  shoppingList: ShoppingListState;
  auth: AuthState;
}
