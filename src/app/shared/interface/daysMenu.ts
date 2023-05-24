import {MealDto} from "./meal.dto";

export interface Menu {
  breakfast: MealMenu
  lunch: MealMenu
  dinner: MealMenu
}

export interface MealMenu {
  mealName: string
  meals: MealDto[]
}

export class Menu implements Menu {
  constructor() {
    this.breakfast = new MealMenu('Завтрак')
    this.lunch = new MealMenu('Обед')
    this.dinner = new MealMenu('Ужин')
  }
}

export class MealMenu implements MealMenu {
  constructor(mealName: string) {
    this.mealName = mealName
    this.meals = [] as MealDto[]
  }
}
