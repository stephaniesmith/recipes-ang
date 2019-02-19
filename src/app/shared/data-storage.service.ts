import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService
  ) {}

  storeRecipes() {
    const req = new HttpRequest('PUT', 'https://alchemy-recipe-book.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
      reportProgress: true,
    });

    return this.httpClient.request(req);
  }

  getRecipes() {

    return this.httpClient.get<Recipe[]>('https://alchemy-recipe-book.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json',
    })
      .pipe(map(recipes => {
        return recipes.map((recipe: Recipe) => {
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
