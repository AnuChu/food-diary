import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AuthorizationPageComponent} from './authorization-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {
  TuiCheckboxLabeledModule,
  TuiDataListWrapperModule, TuiInputFilesModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputPasswordModule, TuiRadioLabeledModule,
  TuiSelectModule
} from "@taiga-ui/kit";
import {TuiLinkModule, TuiTextfieldControllerModule} from "@taiga-ui/core";


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    AuthorizationPageComponent
  ],
  exports: [AuthorizationPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiInputPasswordModule,
    TuiInputNumberModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiCheckboxLabeledModule,
    TuiRadioLabeledModule,
    TuiInputFilesModule,
    TuiLinkModule
  ]
})
export class AuthorizationPageModule {
}
