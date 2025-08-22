import { axiosInstance } from '@/shared/libs'
import type { ProductSchema } from '@/shared/schemas'
import type { IProduct } from '@/shared/types'

class ProductsService {
	public async getProducts(
		params: Record<string, string | null>
	): Promise<IProduct[]> {
		const res = await axiosInstance.get('/products', { params })
		if (res.status !== 200) throw new Error(res.data.message)

		return res.data
	}

	public async getProduct(productId: string): Promise<IProduct> {
		const res = await axiosInstance.get(`/products/${productId}`)
		if (res.status !== 200) throw new Error(res.data.message)

		return res.data
	}

	public async createProduct(body: ProductSchema) {
		const formData = new FormData()

		Object.entries(body).forEach(([key, value]) => {
			if (
				key === 'images' &&
				value instanceof FileList &&
				value.length > 0
			) {
				Array.from(value).forEach(file => {
					formData.append('images', file)
				})
			} else {
				formData.append(key, value)
			}
		})

		const res = await axiosInstance.post('/products', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})

		if (res.status !== 201) throw new Error(res.data.message)

		return res.data
	}
}

export const productsService = new ProductsService()
