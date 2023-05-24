export interface IUser {
  id: string
  name: string
  age: number
  height: number
  weight: number
  photo: string
  gender: number
  purpose: number
  lifestyle: number
}

export interface IUserWithoutId {
  name: string
  age: number
  height: number
  weight: number
  photo: string | null
  gender: number
  purpose: number
  lifestyle: number
}

export interface IUserWithoutIdAndPhoto {
  name: string | null
  age: number | null
  height: number | null
  weight: number | null
  gender: number | null
  purpose: number | null
  lifestyle: number | null
}
