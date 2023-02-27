import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Salad', 'Description1',
    'https://images.immediate.co.uk/production/volatile/sites/30/2014/05/Epic-summer-salad-hub-2646e6e.jpg',
    [
      new Ingredient('Chicken', 1),
      new Ingredient('Lettuce', 1),
    ]),
    new Recipe('Spaghetti', 'Description2',
    'https://ocdn.eu/pulscms-transforms/1/P4Dk9kpTURBXy8wYTQ2YmY1M2NlYTVlMTM2NWU2MjdiMmRjODExZTUxZi5qcGeTlQMAH80D6M0CMpMJpjA2NTMzYgaTBc0EsM0Cdt4AAaEwAQ/spaghetti-puttanesca.jpg',
    [
      new Ingredient('Beef', 1),
      new Ingredient('Pasta', 1),
    ])
  ];

  constructor(private slService: ShoppingListService){

  }

  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients : Ingredient []) {
    this.slService.addIngredients(ingredients);
    }

}
