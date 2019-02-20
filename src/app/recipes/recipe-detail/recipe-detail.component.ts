import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddIngredients } from '../../shopping-list/store/shopping-list.actions';
import { Observable } from 'rxjs';
import { State as RecipeState, FeatureState} from '../store/recipe.reducers';
import { take } from 'rxjs/operators';
import { DeleteRecipe } from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<RecipeState>;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<FeatureState>
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = parseInt(params['id'], 0);
        this.recipeState = this.store.select('recipes');
      });
  }

  onAddToShoppingList() {
    this.store.select('recipes')
      .pipe(take(1))
      .subscribe((recipeState: RecipeState) => {
        this.store.dispatch(new AddIngredients(recipeState.recipes[this.id].ingredients));
      });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(new DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

}
