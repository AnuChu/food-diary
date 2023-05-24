import {Component} from '@angular/core';
import {IRecipe} from "../../../shared/interface/recipe";
import {RecipeRepository} from "../../../shared/repository/recipe.repository";
import {Observable} from "rxjs";

@Component({
  selector: 'app-main-recipe',
  templateUrl: './main-recipe.component.html',
  styleUrls: ['./main-recipe.component.sass']
})
export class MainRecipeComponent {
  recipes: Observable<IRecipe[]> = this.recipeRepository.getUsersRecipes()

  constructor(private recipeRepository: RecipeRepository) {
  }

}
