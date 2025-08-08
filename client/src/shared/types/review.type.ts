import type { IProduct, IUser } from '.'

export interface IReview {
	id: string
	rating: number
	title: string
	comment?: string

	user: IUser
	userId: string
	product: IProduct
	productId: string

	createdAt: string
}
