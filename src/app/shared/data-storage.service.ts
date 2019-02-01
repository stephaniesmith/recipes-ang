import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService) {}

  storeRecipes() {
    return this.http.put('https://alchemy-recipe-book.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    return this.http.get('https://alchemy-recipe-book.firebaseio.com/recipes.json')
      .pipe(map((response: Response) => {
        return response.json().map((recipe: Recipe) => {
          if (!recipe.ingredients) {
            recipe.ingredients = [];
          }
          return recipe;
        });
      }))
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
