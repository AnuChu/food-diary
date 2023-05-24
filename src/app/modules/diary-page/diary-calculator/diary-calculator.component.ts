import {Component, Input, OnInit} from '@angular/core';
import {UserRepository} from "../../../shared/repository/user.repository";
import {IUser} from "../../../shared/interface/entity/user";
import {Menu} from "../../../shared/interface/daysMenu";
import {AuthService} from "../../../shared/service/auth.service";
import {MealDto} from "../../../shared/interface/meal.dto";

@Component({
  selector: 'app-diary-calculator',
  templateUrl: './diary-calculator.component.html',
  styleUrls: ['./diary-calculator.component.sass']
})
export class DiaryCalculatorComponent implements OnInit {

  @Input() mealPlan: Menu | null = new Menu()

  dataUser: IUser | undefined
  date: Date = new Date()

  constructor(private userService: UserRepository, private authService: AuthService) {
  }

  ngOnInit(): void {
    const userObservable = this.userService.getById(this.authService.getCurrentUserId())
    userObservable.subscribe((value) => {
      this.dataUser = value
    })
  }

  genderFactor(gender: number, weight: number, height: number, age: number) {
    if (gender === 1) {
      return ((10 * weight) + (6.25 * height) - (5 * age) + 5)
    } else {
      return ((10 * weight) + (6.25 * height) - (5 * age) + 161)
    }
  }

  lifestyleFactor(lifestyle: number) {
    switch (lifestyle) {
      case 0:
        return 1.2
      case 1:
        return 1.375
      case 2:
        return 1.55
      case 3:
        return 1.725
      case 4:
        return 1.9
      default:
        return 0
    }
  }

  purposeFactor(purpose: number) {
    switch (purpose) {
      case 0:
        return -500
      case 1:
        return 0
      case 2:
        return 300
      default:
        return 0
    }
  }

  currentValue() {
    let currentKcal = 0
    if (this.mealPlan) {
      Object.values(this.mealPlan!).forEach(mealMenu => {
        mealMenu.meals.forEach((meal: MealDto) => {
          currentKcal += meal.recipe.kcal
        })
      })
      const t = currentKcal.toFixed(1)
      return Number(t)
    }
    return 0
  }


  maxKcal() {
    if (this.dataUser == undefined) {
      return 0
    }
    return Math.round((this.genderFactor(this.dataUser.gender, this.dataUser.weight, this.dataUser.height, this.dataUser.age) * this.lifestyleFactor(this.dataUser.lifestyle)) + this.purposeFactor(this.dataUser.purpose))
  }

  protected readonly Math = Math;
}
