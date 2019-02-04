import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const token = this.authService.getToken();

    return this.http.put(`https://alchemy-recipe-book.firebaseio.com/recipes.json?auth=${token}`, this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();

    return this.http.get(`https://alchemy-recipe-book.firebaseio.com/recipes.json?auth=${token}`)
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
