import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/model/Recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  searchTerm: string;

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

  filterRecipes(): void {
    if (!this.searchTerm) {
      this.filteredRecipes = this.recipes;
      return;
    }

    this.filteredRecipes = this.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

 
}
