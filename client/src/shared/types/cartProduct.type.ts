import type { IOrder, IProduct } from '.'

export type CartProduct = {
	id: string

	proudct: IProduct
	productId: string
	order?: IOrder
	orderId?: string

	quantity: number
}
