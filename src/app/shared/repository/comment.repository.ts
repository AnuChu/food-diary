import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IComment, ICommentFirebase, ICommentWithoutId} from "../interface/entity/comment";
import {from, map, Observable} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

@Injectable({
  providedIn: 'root'
})
export class CommentRepository {

  constructor(private store: AngularFirestore) {
  }

  getByRecipeId(recipeId: string): Observable<IComment[]> {
    return fromPromise(
      this.store.collection('comment').ref
        .where('recipeId', '==', recipeId)
        .get()
    ).pipe(
      map(snapshot => {
        return snapshot.docs.map(doc => {
          const docData = doc.data() as ICommentFirebase;
          return {
            id: doc.id,
            date: docData.date.toDate(),
            text: docData.text,
            recipeId: docData.recipeId,
            userId: docData.userId
          };
        });
      })
    );
  }

  create(comment: ICommentWithoutId) {
    return from(this.store.collection('comment').add(comment))
  }

}
