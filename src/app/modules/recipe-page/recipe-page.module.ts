import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipePageComponent} from './recipe-page.component';
import {RecipePublishComponent} from './recipe-publish/recipe-publish.component';
import {RecipeCreateComponent} from './recipe-create/recipe-create.component';
import {RouterLink} from "@angular/router";
import {SharedModule} from "../../components/shared.module";
import {
  TuiComboBoxModule, TuiDataListWrapperModule,
  TuiInputFilesModule,
  TuiInputModule,
  TuiMarkerIconModule,
  TuiTextAreaModule
} from "@taiga-ui/kit";
import {TuiLinkModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    RecipePageComponent,
    RecipePublishComponent,
    RecipeCreateComponent
  ],
  exports: [RecipePageComponent],
  imports: [
    CommonModule,
    RouterLink,
    SharedModule,
    TuiTextAreaModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiInputFilesModule,
    TuiMarkerIconModule,
    TuiLinkModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule
  ]
})
export class RecipePageModule {
}
