import type { IProduct, IUser } from "."

export interface IFavoriteProduct {
  id:string

  product?: IProduct
  productId: string
  user?: IUser
  userId: string
}