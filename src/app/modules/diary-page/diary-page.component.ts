import {Component} from '@angular/core';
import {Menu} from "../../shared/interface/daysMenu";
import {DiaryService} from "../../shared/service/diary.service";
import {AuthService} from "../../shared/service/auth.service";

@Component({
  selector: 'app-diary-page',
  templateUrl: './diary-page.component.html',
  styleUrls: ['./diary-page.component.sass']
})
export class DiaryPageComponent {
  activeDate: Date = new Date()
  mealPlan: Promise<Menu> = this.diaryService.getMealPlan(this.authService.getCurrentUserId(), this.activeDate)

  constructor(private diaryService: DiaryService, private authService: AuthService) {
  }

}
