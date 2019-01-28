import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = parseInt(params['id'], 0);
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FromArrary>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      })
    )
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const { name, imagePath, description, ingredients }  = this.recipeService.getRecipe(this.id);

      recipeName = name;
      recipeImagePath = imagePath;
      recipeDescription = description;

      if (ingredients) {
        ingredients.forEach(ingredient => {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name),
            'amount': new FormControl(ingredient.amount)
          }));
        });
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    });
  }

}
