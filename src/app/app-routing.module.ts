import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./modules/main-page/main-page.component";
import {DiaryPageComponent} from "./modules/diary-page/diary-page.component";
import {AuthorizationPageComponent} from "./modules/authorization-page/authorization-page.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {UserPageComponent} from "./modules/user-page/user-page.component";
import {RecipePageComponent} from "./modules/recipe-page/recipe-page.component";
import {RecipeCreateComponent} from "./modules/recipe-page/recipe-create/recipe-create.component";
import {RecipePublishComponent} from "./modules/recipe-page/recipe-publish/recipe-publish.component";
import {authGuard} from "./auth/auth.guard";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'authorization', component: AuthorizationPageComponent},

  {path: 'user', component: UserPageComponent, canActivate: [authGuard]},
  {path: 'diary', component: DiaryPageComponent, canActivate: [authGuard]},
  {path: 'recipes', component: RecipePageComponent, canActivate: [authGuard], pathMatch: 'full'},
  {path: 'recipes/create', component: RecipeCreateComponent, canActivate: [authGuard]},
  {path: 'recipes/:id', component: RecipePublishComponent, data: {}, canActivate: [authGuard]},
  {path: '**', component: NotFoundComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled", anchorScrolling: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
