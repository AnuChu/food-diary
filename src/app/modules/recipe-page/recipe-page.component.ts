import {Component} from '@angular/core';
import {IRecipe} from "../../shared/interface/recipe";
import {RecipeRepository} from "../../shared/repository/recipe.repository";
import {AuthService} from "../../shared/service/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.sass']
})
export class RecipePageComponent {

  recipes: Observable<IRecipe[]> = this.recipeRepository.getUsersRecipes();
  currentUserRecipes: Observable<IRecipe[]> = this.recipeRepository.getByUserId(this.authService.getCurrentUserId());

  constructor(private recipeRepository: RecipeRepository, private authService: AuthService) {
  }

}
