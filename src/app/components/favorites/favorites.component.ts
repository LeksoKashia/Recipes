import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from 'src/app/model/Recipe.model';
import { FavoritesService } from 'src/app/services/favorites.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit{
  favoriteRecipes: Recipe[] = [];
  @Output() closeFavorites = new EventEmitter<void>();

  constructor(private favoritesService: FavoritesService, private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.getFavoriteRecipes();
  }
 
  getFavoriteRecipes(): void {
    this.favoritesService.getAllFavorites().subscribe(
      favorites => {
        this.favoriteRecipes = favorites;
      },
      error => {
        console.error('Error while retrieving favorite recipes:', error);
      }
    );
  }

  removeFromFavorites(id: number | string){
    this.closeFavorites.emit();
    this.favoritesService.removeFromFavorites(id).subscribe(
      () => {
        this.getFavoriteRecipes();
      },
      error => {
        console.error('Error while deleting the favorite recipe:', error);
      }
    );
  }
}
