import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredients: Ingredient[] = [
    new Ingredient('Pasta', 1),
    new Ingredient('Tomatoes', 5)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients : Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next (this.ingredients.slice());
  }
}
