import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from 'src/app/model/Recipe.model';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {
  @Output() deleteRecipeId = new EventEmitter<number | string>();
  @Input() recipe: Recipe;
  actionsOverlay: boolean;
  favorites: Recipe[];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.loadFavorites();
  }

  emitDeletion(recipeId: number | string) {
    this.deleteRecipeId.emit(recipeId);
  }

  loadFavorites() {
    this.favoritesService.getAllFavorites().subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  toggleOverlay() {
    this.actionsOverlay = !this.actionsOverlay;
  }

  addToFavorites(recipe: Recipe): void {
    this.toggleOverlay();
    if (this.isFavorite(recipe)) {
      this.favoritesService.removeFromFavorites(recipe.id).subscribe(() => {
        console.log('Recipe removed from favorites successfully.');
        this.loadFavorites();
      }, error => {
        console.error('Error while removing recipe from favorites:', error);
      });
    } else {
      this.favoritesService.addToFavorites(recipe).subscribe(() => {
        console.log('Recipe added to favorites successfully.');
        this.loadFavorites();
      }, error => {
        console.error('Error while adding recipe to favorites:', error);
      });
    }
  }

  isFavorite(recipe: Recipe): boolean {
    return this.favorites.some(favorite => favorite.id === recipe.id);
  }
}
