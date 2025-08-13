import type { ICartProduct, IFavoriteProduct, IOrder, IReview } from '.'

export interface IUser {
	id: string

	name: string
	password: string
	email: string

	phone: string
	city?: string
	index?: string
	avatar?: string
	deliveryType: DeliveryType
	paymentType: PaymentType
	address?: string
	role: Role

	orders: IOrder[]
	reviews: IReview[]
	favoriteProducts: IFavoriteProduct[]
	cartProducts: ICartProduct[]

	createdAt: string
	updatedAt: string
}

type PaymentType = 'CASH' | 'CARD'

type DeliveryType = 'PICKUP' | 'DELIVERY'

type Role = 'USER' | 'ADMIN'
