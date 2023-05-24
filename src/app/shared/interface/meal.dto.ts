import {IMeal} from "./entity/meal";
import {IRecipe} from "./recipe";

export interface MealDto {
  meal: IMeal
  recipe: IRecipe
}
