export interface IRecipeEntity {
  id: string
  date: Date
  userId: string
  img: string
  title: string
  kcal: number
  carbohydrate: number
  fat: number
  protein: number
  description: string
  productIds: string[]
}

export interface IRecipeEntityWithoutId {
  date: Date
  userId: string
  img: string
  title: string
  kcal: number
  carbohydrate: number
  fat: number
  protein: number
  description: string
  productIds: string[]
}
