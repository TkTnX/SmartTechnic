import { axiosInstance } from '@/shared/libs'

class FavoritesService {
	async addToFavorites(productId: string) {
		const res = await axiosInstance.post(`/favorites/${productId}`)

		if (res.status !== 201) throw new Error(res.data.message)

		return res.data
	}
}

export const favoritesService = new FavoritesService()
