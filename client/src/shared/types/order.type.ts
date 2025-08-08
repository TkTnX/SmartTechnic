import type { IUser, CartProduct } from '.'

export interface IOrder {
	id: string

	status: OrderStatus
	address: string

	  products: CartProduct[]

	userId: string
	user: IUser

	createdAt: string
	updatedAt: string
}

type OrderStatus = 'PENDING' | 'DELIVERED'
