import {Injectable} from '@angular/core';
import {MealMenu, Menu} from "../interface/daysMenu";
import {MealRepository} from "../repository/meal.repository";
import {RecipeRepository} from "../repository/recipe.repository";
import {firstValueFrom} from "rxjs";
import {IRecipe} from "../interface/recipe";
import {MealDto} from "../interface/meal.dto";

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  mealTypes = ['breakfast', 'lunch', 'dinner']
  mealPlan: Menu = new Menu()

  constructor(private mealService: MealRepository, private recipeService: RecipeRepository) {
  }

  async getMealPlan(userId: string, activeDate: Date) {
    const meals = await firstValueFrom(this.mealService.getMealsByDate(userId, activeDate))
    for (const mealType of this.mealTypes) {
      let mealDtos: MealDto[] = []
      for (const meal of meals) {
        if (meal.type != mealType) {
          continue
        }
        let recipe: IRecipe = <IRecipe>{}
        try {
          recipe = await firstValueFrom(this.recipeService.getById(meal.recipeId));
        } catch (e) {
        }

        const mealDto: MealDto = {
          meal: meal,
          recipe: recipe
        }
        mealDtos.push(mealDto)
      }

      (<MealMenu>this.mealPlan[mealType as keyof Menu]).meals = mealDtos;
    }
    return this.mealPlan
  }

}
