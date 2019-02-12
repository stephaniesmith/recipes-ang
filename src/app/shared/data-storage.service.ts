import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const token = this.authService.getToken();

    return this.httpClient.put('https://alchemy-recipe-book.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
      observe: 'body',
      params: new HttpParams().set('auth', token)
      // headers: new HttpHeaders().set('Authorization', 'Bearer askdfj')
    });
  }

  getRecipes() {
    const token = this.authService.getToken();

    return this.httpClient.get<Recipe[]>('https://alchemy-recipe-book.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json',
      params: new HttpParams().set('auth', token)
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
