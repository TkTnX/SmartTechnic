import type { IOrder, IProduct } from '.';





export interface ICartProduct {
	id: string

	product: IProduct
	productId: string
	order?: IOrder
	orderId?: string

	quantity: number
}