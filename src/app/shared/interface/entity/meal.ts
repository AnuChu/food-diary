export interface IMeal {
  id: string
  date: Date
  userId: string
  recipeId: string
  type: string
}

export interface IMealWithoutId {
  date: Date
  userId: string
  recipeId: string
  type: string
}
