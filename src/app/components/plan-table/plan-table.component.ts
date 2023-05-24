import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {IRecipe} from "../../shared/interface/recipe";
import {MealRepository} from "../../shared/repository/meal.repository";
import {RecipeRepository} from "../../shared/repository/recipe.repository";


@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.sass']
})


export class PlanTableComponent implements OnChanges {
  @Input() addProduct?: boolean = true
  @Input() addedRecipes: IRecipe[]
  @Input() allRecipes: IRecipe[] | null | undefined
  @Input() type: string
  @Input() addNewRowFunc: (recipe: IRecipe, type: string) => void
  @Input() deleteRowFunc: (recipe: IRecipe, type: string) => void
  itemsAdd: string[] = []

  productAdd = new FormGroup({
    product: new FormControl(null),
  });

  get product() {
    return this.productAdd.controls.product;
  }

  constructor(private mealService: MealRepository, private recipeService: RecipeRepository) {
    this.productAdd.controls.product.valueChanges.subscribe(value => {
      if (value == null) {
        return
      }
      this.recipeService.getByTitle(value).subscribe(r => {
        this.addNewRowFunc(r[0], this.type)
        this.productAdd.controls.product.setValue(null)

      })
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.itemsAdd = changes.allRecipes?.currentValue?.map((r: IRecipe) => r.title) || this.itemsAdd
  }

}
