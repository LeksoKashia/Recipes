import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../model/Recipe.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private apiUrl = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }
  
  getRecipeById(id: number | string): Observable<Recipe> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Recipe>(url);
  }
  
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    const url = `${this.apiUrl}/${recipe.id}`;
    return this.http.put<Recipe>(url, recipe);
  }

  deleteRecipe(id: string | number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

}
