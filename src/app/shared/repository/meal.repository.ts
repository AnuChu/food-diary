import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IMeal, IMealWithoutId} from "../interface/entity/meal";
import {from, map, Observable} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

@Injectable({
  providedIn: 'root'
})
export class MealRepository {

  constructor(private store: AngularFirestore) {
  }

  getMealsByDate(userId: string, date: Date): Observable<IMeal[]> {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    return fromPromise(
      this.store.collection('meal').ref
        .where('date', '>=', startDate)
        .where('date', '<=', endDate)
        .where('userId', '==', userId)
        .get()
    ).pipe(
      map(snapshot => {
        return snapshot.docs.map(doc => {
          const docData = doc.data() as IMeal;
          return {
            id: doc.id,
            date: docData.date,
            userId: docData.userId,
            recipeId: docData.recipeId,
            type: docData.type
          };
        });
      })
    );
  }

  create(meal: IMealWithoutId) {
    return from(this.store.collection('meal').add(meal));
  }

  delete(id: string): Observable<void> {
    return from(this.store.collection('meal').doc(id).delete());
  }

}
