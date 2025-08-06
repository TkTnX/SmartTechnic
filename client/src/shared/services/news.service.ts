import { axiosInstance } from '@/shared/libs'
import type { INews } from '@/shared/types'

class NewsService {
	async getNews(params: Record<string, string>): Promise<INews[]> {
		const res = await axiosInstance.get('/news', { params })
		if (res.status !== 200) throw new Error('Error')

		return res.data
	}
}

export const newsService = new NewsService()
