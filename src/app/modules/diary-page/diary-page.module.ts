import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {DiaryCalculatorComponent} from './diary-calculator/diary-calculator.component';
import {DiaryPlanComponent} from './diary-plan/diary-plan.component';
import {DiaryUserComponent} from './diary-user/diary-user.component';
import {DiaryPageComponent} from './diary-page.component';
import {RouterLink} from "@angular/router";
import {SharedModule} from "../../components/shared.module";
import {TuiArcChartModule, TuiRingChartModule} from "@taiga-ui/addon-charts";
import localeRu from '@angular/common/locales/ru';
import {TuiInputDateModule} from "@taiga-ui/kit";
import {ReactiveFormsModule} from "@angular/forms";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    DiaryCalculatorComponent,
    DiaryPlanComponent,
    DiaryUserComponent,
    DiaryPageComponent
  ],
  exports: [DiaryPageComponent],
  imports: [
    CommonModule,
    RouterLink,
    SharedModule,
    TuiRingChartModule,
    TuiInputDateModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiArcChartModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru'}
  ]
})
export class DiaryPageModule {
}
