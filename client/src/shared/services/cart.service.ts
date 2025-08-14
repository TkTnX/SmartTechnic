import { axiosInstance } from '@/shared/libs'

class CartService {
	public async addToCart(productId: string) {
		const res = await axiosInstance.post(`/cart-products/${productId}`)

		if (res.status !== 201) throw new Error(res.data.message)

		return res.data
	}

	public async changeQuantity(
		cartProductId: string,
		value: 'minus' | 'plus'
	) {
		const res = await axiosInstance.patch(
			`/cart-products/quantity/${cartProductId}`,
			{ value }
		)

		if (res.status !== 200) throw new Error(res.data.message)

		return res.data
	}

	public async removeFromCart(cartProductId: string) {
		const res = await axiosInstance.delete(`/cart-products/${cartProductId}`)

		if (res.status !== 200) throw new Error(res.data.message)
		
		return res.data
	}
}

export const cartService = new CartService()
