import {Timestamp} from "@angular/fire/firestore";


export interface IComment {
  id: string
  recipeId: string
  userId: string
  date: Date
  text: string
}

export interface ICommentWithoutId {
  recipeId: string
  userId: string
  date: Date
  text: string
}

export interface ICommentFirebase {
  id: string
  recipeId: string
  userId: string
  date: Timestamp
  text: string
}
