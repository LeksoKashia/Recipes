export interface Recipe {
  id?: number | string; 
  title: string;
  description: string;
  thumbnail: string;
  ingredients: string[];
  instructions: string[];
}