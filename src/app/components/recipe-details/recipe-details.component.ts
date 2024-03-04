import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/model/Recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit{
  recipe : Recipe;

  constructor(private route: ActivatedRoute,  private recipesService: RecipesService){

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const recipeId = params['id']; 
      console.log(recipeId);
      
  
      this.recipesService.getRecipeById(recipeId).subscribe(
        (recipe) => {
          this.recipe = recipe;
        }
      );
    });
  }
  
}
