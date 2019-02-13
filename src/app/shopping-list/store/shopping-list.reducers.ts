import { ShoppingListActions, ADD_INGREDIENT, ADD_INGREDIENTS, UPDATE_INGREDIENTS, DELETE_INGREDIENTS } from './shopping-list.actions';
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
      const { index, ingredient } = action.payload;
      const ingredients = [...state.ingredients];

      ingredients[index] = {
        ...state.ingredients[index],
        ...ingredient
      };

      return { ...state, ingredients };
    case DELETE_INGREDIENTS:
      const oldIngredients = [...state.ingredients];
      oldIngredients.slice(action.payload, 1);
      return { ...state, ingredients: oldIngredients };
    default:
      return state;
  }
}
