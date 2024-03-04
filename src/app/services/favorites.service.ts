import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../model/Recipe.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoritesUrl = 'http://localhost:3000/favorites';

  constructor(private http: HttpClient) {}

  getAllFavorites(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.favoritesUrl);
  }

  addToFavorites(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.favoritesUrl, recipe);
  }

  removeFromFavorites(recipeId: string | number): Observable<any> {
    const url = `${this.favoritesUrl}/${recipeId}`;
    return this.http.delete(url);
  }

}
