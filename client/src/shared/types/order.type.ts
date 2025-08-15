import type { IUser, ICartProduct } from '.'

export interface IOrder {
	id: string

	status: OrderStatus
	address: string

	  products: ICartProduct[]

	userId: string
	user: IUser

	createdAt: string
	updatedAt: string
}

type OrderStatus = 'PENDING' | 'DELIVERED'

export type DeliveryTypes = 'pickup' | 'delivery'
export type PaymentTypes = 'cash' | 'card'