import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserPageComponent} from './user-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {
    TuiCheckboxLabeledModule,
    TuiDataListWrapperModule, TuiFilesModule, TuiInputFilesModule,
    TuiInputModule,
    TuiInputNumberModule, TuiInputPasswordModule, TuiRadioBlockModule, TuiRadioLabeledModule,
    TuiSelectModule
} from "@taiga-ui/kit";
import {TuiGroupModule, TuiLinkModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    UserPageComponent
  ],
  exports: [UserPageComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiInputNumberModule,
        TuiSelectModule,
        TuiDataListWrapperModule,
        TuiCheckboxLabeledModule,
        RouterLink,
        TuiRadioBlockModule,
        TuiGroupModule,
        TuiRadioLabeledModule,
        TuiFilesModule,
        TuiInputFilesModule,
        TuiInputPasswordModule,
        TuiLinkModule
    ]
})
export class UserPageModule {
}
