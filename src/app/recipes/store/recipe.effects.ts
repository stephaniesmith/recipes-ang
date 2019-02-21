import { Effect, Actions, ofType } from '@ngrx/effects';
import { FETCH_RECIPES, FetchRecipes, STORE_RECIPES, SET_RECIPES } from './recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeatureState } from './recipe.reducers';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$.pipe(
    ofType(FETCH_RECIPES),
    switchMap((action: FetchRecipes) => {
      return this.httpClient.get<Recipe[]>('https://alchemy-recipe-book.firebaseio.com/recipes.json', {
        observe: 'body',
        responseType: 'json',
      });
    }),
    map(recipes => {
      return recipes.map((recipe: Recipe) => {
        if (!recipe.ingredients) {
          recipe.ingredients = [];
        }
        return {
          type: SET_RECIPES,
          payload: recipes
        };
      });
    }),
  );

  @Effect({ dispatch: false })
  recipeStore = this.actions$.pipe(
    ofType(STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', 'https://alchemy-recipe-book.firebaseio.com/recipes.json', state.recipes, {
        reportProgress: true,
      });
      return this.httpClient.request(req);
    })
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<FeatureState>
    ) {}
}
