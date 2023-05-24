import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from "@angular/router";
import {MainPageComponent} from './main-page.component';
import {MainRecipeComponent} from './main-recipe/main-recipe.component';
import {MainServiceComponent} from './main-service/main-service.component';
import {SharedModule} from "../../components/shared.module";


@NgModule({
  declarations: [
    MainPageComponent,
    MainRecipeComponent,
    MainServiceComponent
  ],
  exports: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    SharedModule
  ]
})
export class MainPageModule {
}
