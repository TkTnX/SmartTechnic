import { axiosInstance } from '@/shared/libs'
import type { SpecificationSchema } from '@/shared/schemas'
import type { ISpecification } from '@/shared/types'

class SpecificationsService {
	public async getSpecificationsByCategory(
		categoryId: string
	): Promise<ISpecification[]> {
		const res = await axiosInstance.get(`/specifications/${categoryId}`)

		if (res.status !== 200) throw new Error(res.data.message)

		return res.data
	}
	public async getSpecifications(): Promise<ISpecification[]> {
		const res = await axiosInstance.get(`/specifications`)

		if (res.status !== 200) throw new Error(res.data.message)

		return res.data
	}

	public async createSpecification(
		productId: string,
		categoryId: string,
		body: SpecificationSchema
	) {
		const res = await axiosInstance.post(`/specifications/${productId}`, {
			...body,
			categoryId
		})

		if (res.status !== 201) throw new Error(res.data.message)

		return res.data
	}

	public async deleteSpecification(specificationId: string) {
		const res = await axiosInstance.delete(`/specifications/${specificationId}`)

		if (res.status !== 200) throw new Error(res.data.message)
		
		return res.data
	}
}

export const specificationsService = new SpecificationsService()
