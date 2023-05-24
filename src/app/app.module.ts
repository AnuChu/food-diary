import {TUI_SANITIZER, TuiRootModule, TuiSvgModule} from "@taiga-ui/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from "./components/shared.module";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {DiaryPageModule} from "./modules/diary-page/diary-page.module";
import {MainPageModule} from "./modules/main-page/main-page.module";
import {AuthorizationPageModule} from "./modules/authorization-page/authorization-page.module";
import {RecipePageModule} from "./modules/recipe-page/recipe-page.module";
import {UserPageModule} from "./modules/user-page/user-page.module";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {environment} from '../environments/environment';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFirebaseErrorHandler} from "./AngularFirebaseErrorHandler";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TuiRootModule,
    SharedModule,
    DiaryPageModule,
    MainPageModule,
    AuthorizationPageModule,
    RecipePageModule,
    UserPageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    TuiSvgModule
  ],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}, { provide: ErrorHandler, useClass: AngularFirebaseErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
