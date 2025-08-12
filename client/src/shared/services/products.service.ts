import { axiosInstance } from '@/shared/libs'
import type { IProduct } from '@/shared/types'

class ProductsService {
	async getProducts(
		params: Record<string, string | null>
	): Promise<IProduct[]> {
		const res = await axiosInstance.get('/products', { params })
		if (res.status !== 200) throw new Error(res.data.message)

		return res.data
	}

	async getProduct(productId: string): Promise<IProduct> {
		const res = await axiosInstance.get(`/products/${productId}`)
		if (res.status !== 200) throw new Error(res.data.message)

		return res.data
	}
}

export const productsService = new ProductsService()
