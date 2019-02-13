import { ShoppingListActions, ADD_INGREDIENT, ADD_INGREDIENTS, UPDATE_INGREDIENTS, DELETE_INGREDIENTS } from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
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
