import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from 'src/app/model/Recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent{
  @Output() deleteRecipeId = new EventEmitter<number | string>();
  @Input() recipe : Recipe;
  actionsOverlay : boolean;

  emitDeletion(recipeId: number | string){
    this.deleteRecipeId.emit(recipeId);
  }

  toggleOverlay(){
    this.actionsOverlay = !this.actionsOverlay;
  }
}
