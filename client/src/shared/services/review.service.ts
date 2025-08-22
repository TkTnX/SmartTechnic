import { axiosInstance } from '@/shared/libs'
import type { ReviewSchema } from '@/shared/schemas'

class ReviewService {
	public async writeReview(productId: string, body: ReviewSchema) {
		const res = await axiosInstance.post(`/reviews/${productId}`, {
			...body
		})

		if (res.status !== 201) throw new Error(res.data.message)

		return res.data
	}
}

export const reviewService = new ReviewService()
