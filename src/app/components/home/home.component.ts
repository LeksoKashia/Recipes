import { Component, OnInit, ViewChild } from '@angular/core';
import { Recipe } from 'src/app/model/Recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  recipes: Recipe[];
  filteredRecipes: Recipe[];

  ngOnInit(): void {
    this.getRecipes();
  }

  constructor(private recipeService: RecipesService) {}

  getRecipes(): void {
    this.recipeService.getRecipes()
      .subscribe(recipes => {
        this.recipes = recipes;
        this.filteredRecipes = recipes;
      });
  }

  filterRecipes(searchTerm: string ): void {
    if (!searchTerm) {
      this.filteredRecipes = this.recipes;
      return;
    }
  
    this.filteredRecipes = this.recipes.filter(recipe => {
      const titleMatch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
  
      const ingredientMatch = recipe.ingredients.some(ingredient =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      return titleMatch || ingredientMatch;
    });
  }

 
}
