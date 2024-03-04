import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from 'src/app/model/Recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  @Input() recipes : Recipe[];
  @Output() regenerate = new EventEmitter<void>();


  constructor(private recipeService: RecipesService) {}


  deleteRecipe(recipeId: number | string): void {
    this.recipeService.deleteRecipe(recipeId)
      .subscribe(() => {
          this.regenerate.emit();
    });
  }

}
