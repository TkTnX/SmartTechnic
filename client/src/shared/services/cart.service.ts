import { axiosInstance } from '@/shared/libs'

class CartService {
	public async addToCart(productId: string) {
		const res = await axiosInstance.post(`/cart-products/${productId}`)

		if (res.status !== 201) throw new Error(res.data.message)

		return res.data
	}
}

export const cartService = new CartService()
