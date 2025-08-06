import { axiosInstance } from '@/shared/libs'
import type { IProduct } from '@/shared/types'

class ProductsService {
	async getProducts(params: Record<string, string>): Promise<IProduct[]> {
		const res = await axiosInstance.get('/products', {
			params: params
		})
		if (res.status !== 200) throw new Error('Error')

		return res.data
	}
}

export const productsService = new ProductsService()
