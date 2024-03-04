import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Recipe } from 'src/app/model/Recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  recipeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      thumbnail: [null, Validators.required],
      ingredients: this.formBuilder.array([
        this.createIngredientFormGroup()
      ]),
      instructions: this.formBuilder.array([
        this.createInstructionControl()
      ])
    });
  }
  
  get instructions(): FormArray {
    return this.recipeForm.get('instructions') as FormArray;
  }
  
  createInstructionControl(): FormControl {
    return this.formBuilder.control('', Validators.required);
  }
  
  addInstruction(): void {
    this.instructions.push(this.createInstructionControl());
  }
  
  removeInstruction(index: number): void {
    this.instructions.removeAt(index);
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  createIngredientFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  addIngredient(): void {
    this.ingredients.push(this.createIngredientFormGroup());
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  onThumbnailChange(event: any): void {
    const file = (event.target as HTMLInputElement).files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.recipeForm.patchValue({
          thumbnail: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }
  

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const recipe: Recipe = {
        title: this.recipeForm.value.title,
        description: this.recipeForm.value.description,
        thumbnail: this.recipeForm.value.thumbnail,
        ingredients: this.recipeForm.value.ingredients.map(ingredient => ingredient.name),
        instructions: this.recipeForm.value.instructions
      };

      this.recipeService.addRecipe(recipe).subscribe(() => {
        console.log('Recipe added successfully.');
        this.recipeForm.reset();
      }, error => {
        console.error('Error adding recipe:', error);
      });
    }
  }
}
