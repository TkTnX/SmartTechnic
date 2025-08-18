import type { IUser, IProduct, ICartProduct } from '.'

export interface IOrder {
	id: string

	status: OrderStatus
	deliveryType: DeliveryTypes
	deliveryDate?: string
	city: string
	street: string
	paymentType: PaymentTypes
	index?: string
	username: string
	userPhone: string
	userEmail: string
	comment?: string
	totalPrice: number

	orderItems: IOrderItem[]
	products: ICartProduct[]

	userId: string
	user: IUser

	createdAt: string
	updatedAt: string
}

export interface IOrderItem {
	id: string

	product?: IProduct
	productId: string

	order?: IOrder,
	orderId: string

	createdAt: string
	updatedAt: string
}

type OrderStatus = 'PENDING' | 'DELIVERED'

export type DeliveryTypes = 'PICKUP' | 'DELIVERY'
export type PaymentTypes = 'CASH' | 'CARD'
export type OrderStatuses = 'PENDING' | 'CONFIRMED' | 'DELIVERED' | 'CANCELED'