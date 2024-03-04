import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Recipe } from 'src/app/model/Recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss', '../add-recipe/add-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  recipe: Recipe;
  recipeForm: FormGroup;
  thumbnailPath: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private recipesService: RecipesService
  ) { }

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      thumbnail: ['', Validators.required],
      ingredients: this.formBuilder.array([]),
      instructions: this.formBuilder.array([])
    });

    this.route.params.subscribe(params => {
      const recipeId = params['id'];

      this.recipesService.getRecipeById(recipeId).subscribe(
        (recipe) => {
          this.recipe = recipe;
          this.patchForm(recipe);
        }
      );
    });
  }

  patchForm(recipe: Recipe): void {
    this.recipeForm.patchValue({
      title: recipe.title,
      description: recipe.description,
    });
  
    this.thumbnailPath = recipe.thumbnail;
    this.setIngredients(recipe.ingredients);
    this.setInstructions(recipe.instructions);
  }
  

  setIngredients(ingredients: string[]): void {
    const ingredientFormArray = this.recipeForm.get('ingredients') as FormArray;
    ingredients.forEach(ingredient => {
      ingredientFormArray.push(this.formBuilder.control(ingredient, Validators.required));
    });
  }

  setInstructions(instructions: string[]): void {
    const instructionFormArray = this.recipeForm.get('instructions') as FormArray;
    instructions.forEach(instruction => {
      instructionFormArray.push(this.formBuilder.control(instruction, Validators.required));
    });
  }

  onThumbnailChange(event: any): void {
    const file = (event.target as HTMLInputElement).files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.recipeForm.patchValue({
          thumbnail: reader.result
        });
        this.thumbnailPath = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  addIngredient(): void {
    const ingredientFormArray = this.recipeForm.get('ingredients') as FormArray;
    ingredientFormArray.push(this.formBuilder.control('', Validators.required));
  }

  removeIngredient(index: number): void {
    const ingredientFormArray = this.recipeForm.get('ingredients') as FormArray;
    if (ingredientFormArray.length > 1) {
      ingredientFormArray.removeAt(index);
    }
  }

  addInstruction(): void {
    const instructionFormArray = this.recipeForm.get('instructions') as FormArray;
    instructionFormArray.push(this.formBuilder.control('', Validators.required));
  }

  removeInstruction(index: number): void {
    const instructionFormArray = this.recipeForm.get('instructions') as FormArray;
    if (instructionFormArray.length > 1) {
      instructionFormArray.removeAt(index);
    }
  }

  isIngredientRemovable(): boolean {
    const ingredientFormArray = this.recipeForm.get('ingredients') as FormArray;
    return ingredientFormArray.length === 1;
  }

  isInstructionRemovable(): boolean {
    const instructionFormArray = this.recipeForm.get('instructions') as FormArray;
    return instructionFormArray.length === 1;
  }

  updateRecipe(): void {
    if (this.recipeForm.valid) {
      const updatedRecipe: Recipe = {
        id: this.recipe.id,
        title: this.recipeForm.value.title,
        description: this.recipeForm.value.description,
        thumbnail: this.recipeForm.value.thumbnail,
        ingredients: this.recipeForm.value.ingredients,
        instructions: this.recipeForm.value.instructions
      };

      this.recipesService.updateRecipe(updatedRecipe).subscribe(
        updatedRecipe => {
          console.log('Recipe updated successfully:', updatedRecipe);
        },
        error => {
          console.error('Error updating recipe:', error);
        }
      );
    } else {
      console.error('Form is invalid. Cannot update recipe.');
    }
  }
}
