import {
  ShoppingListActions,
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  UPDATE_INGREDIENTS,
  DELETE_INGREDIENTS,
  START_EDIT,
  STOP_EDIT
} from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case ADD_INGREDIENTS:
      return { ...state, ingredients: [...state.ingredients, ...action.payload] };
    case UPDATE_INGREDIENTS:
      const { ingredient } = action.payload;
      const ingredients = [...state.ingredients];

      ingredients[state.editedIngredientIndex] = {
        ...state.ingredients[state.editedIngredientIndex],
        ...ingredient
      };

      return { ...state, ingredients, editedIngredient: null, editedIngredientIndex: -1 };
    case DELETE_INGREDIENTS:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return { ...state, ingredients: oldIngredients, editedIngredient: null, editedIngredientIndex: -1 };
    case START_EDIT:
      const editedIngredient = { ...state.ingredients[action.payload] };
      return { ...state, editedIngredient, editedIngredientIndex: action.payload };
    case STOP_EDIT:
      return { ...state, editedIngredient: null, editedIngredientIndex: -1 };
    default:
      return state;
  }
}
