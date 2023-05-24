export interface IRecipe {
  id: string
  date: string
  userId: string
  img: string
  title: string
  kcal: number
  carbohydrate: number
  fat: number
  protein: number
  description: string
  productIds: string[]
  commentCount: number
}

export interface IRecipeWithoutId {
  date: string
  userId: string
  img: string
  title: string
  kcal: number
  carbohydrate: number
  fat: number
  protein: number
  description: string
  productIds: string[]
  commentCount: number
}
