import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeCardComponent} from "./recipe-card/recipe-card.component";
import {RouterLink} from "@angular/router";
import {PlanTableComponent} from "./plan-table/plan-table.component";
import {ReactiveFormsModule} from "@angular/forms";
import {TuiComboBoxModule, TuiDataListWrapperModule, TuiFilterByInputPipeModule} from "@taiga-ui/kit";
import {TuiHostedDropdownModule, TuiSvgModule, TuiTextfieldControllerModule} from "@taiga-ui/core";


@NgModule({
  declarations: [
    RecipeCardComponent,
    PlanTableComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    TuiComboBoxModule,
    TuiTextfieldControllerModule,
    TuiDataListWrapperModule,
    TuiFilterByInputPipeModule,
    TuiHostedDropdownModule,
    TuiSvgModule
  ],
  exports: [
    RecipeCardComponent,
    PlanTableComponent
  ]
})
export class SharedModule {
}
