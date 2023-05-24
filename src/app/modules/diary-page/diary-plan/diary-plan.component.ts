import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MealRepository} from "../../../shared/repository/meal.repository";
import {IMeal, IMealWithoutId} from "../../../shared/interface/entity/meal";
import {MealMenu, Menu} from "../../../shared/interface/daysMenu";
import {RecipeRepository} from "../../../shared/repository/recipe.repository";
import {IRecipe} from "../../../shared/interface/recipe";
import {FormControl} from "@angular/forms";
import {TuiDay} from "@taiga-ui/cdk";
import {DiaryService} from "../../../shared/service/diary.service";
import {MealDto} from "../../../shared/interface/meal.dto";
import {AuthService} from "../../../shared/service/auth.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-diary-plan',
  templateUrl: './diary-plan.component.html',
  styleUrls: ['./diary-plan.component.sass']
})
export class DiaryPlanComponent implements OnInit {

  @Input() mealPlan: Menu | null = new Menu()
  @Output() changeMealPlanEvent = new EventEmitter<Menu>()

  activeDate: Date = new Date()
  allRecipes: Observable<IRecipe[] | undefined> = this.recipeRepository.getRecipes()

  constructor(private diaryService: DiaryService, private recipeRepository: RecipeRepository, private authService: AuthService, private mealRepository: MealRepository) {
  }

  ngOnInit(): void {
    this.dateControl.valueChanges.subscribe((value) => {
      this.diaryService.getMealPlan(this.authService.getCurrentUserId(), value?.toLocalNativeDate()!).then(r => {
        this.changeMealPlanEvent.emit(r)
        this.activeDate = value?.toLocalNativeDate()!
      });
    })
  }

  addNewMeal = (recipe: IRecipe, mealType: string) => {
    let meal: IMealWithoutId = {
      date: new Date(this.activeDate),
      userId: this.authService.getCurrentUserId(),
      recipeId: recipe.id,
      type: mealType
    }
    this.mealRepository.create(meal).subscribe((docRef) => {
      const newMeal: IMeal = {id: docRef.id, ...meal}
      const newMealDto: MealDto = {
        meal: newMeal,
        recipe: recipe
      };
      (<MealMenu>this.mealPlan![mealType as keyof Menu]).meals.push(newMealDto)
      this.changeMealPlanEvent.emit(this.mealPlan!)
    })
  }

  deleteMeal = (recipe: IRecipe, mealType: string) => {
    const mealDto = (<MealMenu>this.mealPlan![mealType as keyof Menu]).meals.filter(m => m.recipe.id === recipe.id)[0]
    this.mealRepository.delete(mealDto.meal.id).subscribe(() => {
      for (let i = 0; i < (<MealMenu>this.mealPlan![mealType as keyof Menu]).meals.length; i++) {
        if ((<MealMenu>this.mealPlan![mealType as keyof Menu]).meals[i].meal.id === mealDto.meal.id) {
          (<MealMenu>this.mealPlan![mealType as keyof Menu]).meals.splice(i, 1)
          this.changeMealPlanEvent.emit(this.mealPlan!)
          break
        }
      }
    })
  }

  protected readonly Object = Object;
  readonly dateControl = new FormControl(TuiDay.currentLocal());

  getAddedRecipes(mealType: string) {
    if (this.mealPlan) {
      return (<MealMenu>this.mealPlan![mealType as keyof Menu]).meals.map(m => m.recipe);
    }
    return []
  }
}
