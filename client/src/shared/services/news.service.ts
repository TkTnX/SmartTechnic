import { axiosInstance } from '@/shared/libs';
import type { INews } from '@/shared/types';





class NewsService {
	public async getNews(params: Record<string, string>): Promise<INews[]> {
		const res = await axiosInstance.get('/news', { params })
		if (res.status !== 200) throw new Error(res.data.message)

		return res.data
	}

	public async getNewsItem(newsId: string): Promise<INews> {
		const res = await axiosInstance.get(`/news/${newsId}`)

		if (res.status !== 200) throw new Error(res.data.message)
		
		return res.data
	}
	
}

export const newsService = new NewsService()