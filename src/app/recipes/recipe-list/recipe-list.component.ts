import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('Salad', 'Description1',
    'https://images.immediate.co.uk/production/volatile/sites/30/2014/05/Epic-summer-salad-hub-2646e6e.jpg'),
    new Recipe('Spaghetti', 'Description2',
    'https://ocdn.eu/pulscms-transforms/1/P4Dk9kpTURBXy8wYTQ2YmY1M2NlYTVlMTM2NWU2MjdiMmRjODExZTUxZi5qcGeTlQMAH80D6M0CMpMJpjA2NTMzYgaTBc0EsM0Cdt4AAaEwAQ/spaghetti-puttanesca.jpg')
  ];

}
