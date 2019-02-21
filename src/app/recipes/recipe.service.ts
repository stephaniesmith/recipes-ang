import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Pizza',
      'Looks delicious!',
      // tslint:disable-next-line:max-line-length
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
      [
        new Ingredient('Cheese', 1),
        new Ingredient('Crust', 20)
      ]
    ),
    new Recipe(
      'More Pizza!',
      'Looks delicious!',
      // tslint:disable-next-line:max-line-length
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
      [
        new Ingredient('Cheese', 20),
        new Ingredient('Crust', 23)
      ]
    )
  ];

  constructor() {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }
}
