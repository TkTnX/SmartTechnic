import { axiosInstance } from '@/shared/libs'
import type { PromoSchema } from '@/shared/schemas'
import type { IPromo } from '@/shared/types'

class PromoService {
	public async getPromos(): Promise<IPromo[]> {
		const res = await axiosInstance.get('/promos')

		if (res.status !== 200) throw new Error(res.data.message)

		return res.data
	}
	public async getPromo(promoId: string): Promise<IPromo> {
		const res = await axiosInstance.get(`/promos/${promoId}`)

		if (res.status !== 200) throw new Error(res.data.message)

		return res.data
	}

	public async createPromo(body: PromoSchema) {
		const formData = new FormData()

		Object.entries(body).forEach(([key, value]) => {
			if (
				(key === 'image' || key === 'preview') &&
				value instanceof FileList &&
				value.length > 0
			) {
				formData.append(key, value[0])
			} else {
				formData.append(key, String(value))
			}
		})

		const res = await axiosInstance.post('/promos', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})

		if (res.status !== 201) throw new Error(res.data.message)
		return res.data
	}

	public async deletePromo(promoId: string) {
		const res = await axiosInstance.delete(`/promos/${promoId}`)

		if (res.status !== 200) throw new Error(res.data.message)

		return res.data
	}
}

export const promoService = new PromoService()
