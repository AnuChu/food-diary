import {Injectable} from '@angular/core';
import {combineLatest, from, map, Observable} from "rxjs";
import {IRecipe, IRecipeWithoutId} from "../interface/recipe";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IRecipeEntityWithoutId} from "../interface/entity/recipeEntity";

@Injectable({
  providedIn: 'root'
})
export class RecipeRepository {

  constructor(private store: AngularFirestore) {
  }

  getRecipes(): Observable<IRecipe[]> {
    return this.store.collection('recipes').valueChanges({idField: 'id'}) as unknown as Observable<IRecipe[]>
  }

  getByIds(ids: string[]): Observable<IRecipe[]> {
    const docRefs = ids.map(id => this.store.collection('recipes').doc(String(id)).valueChanges({idField: 'id'}) as unknown as Observable<IRecipe>)
    return combineLatest(docRefs)
  }

  getById(id: string) {
    return this.store.collection('recipes').doc(id).valueChanges({idField: 'id'}) as unknown as Observable<IRecipe>
  }

  getByTitle(title: string): Observable<IRecipe[]> {
    return from(
      this.store.collection('recipes').ref
        .where('title', '==', title)
        .get()
    ).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as IRecipeWithoutId})))
    );
  }

  create(recipe: IRecipeEntityWithoutId): Observable<any> {
    return from(this.store.collection('recipes').add(recipe));
  }

  getProducts(): Observable<IRecipe[]> {
    return from(
      this.store.collection('recipes').ref
        .where('productIds', '==', [])
        .get()
    ).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as IRecipeWithoutId})))
    );
  }

  getUsersRecipes(): Observable<IRecipe[]> {
    return from(
      this.store.collection('recipes').ref
        .where('productIds', '!=', [])
        .get()
    ).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as IRecipeWithoutId })))
    );
  }

  getByUserId(userId: string): Observable<IRecipe[]> {
    return from(
      this.store.collection('recipes').ref
        .where('userId', '==', userId)
        .get()
    ).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as IRecipeWithoutId })))
    );
  }

}
