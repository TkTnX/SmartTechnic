import { axiosInstance } from '@/shared/libs'
import type { NewsSchema } from '@/shared/schemas'
import type { INews } from '@/shared/types'

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

	public async createNews(body: NewsSchema) {
		const formData = new FormData()

		Object.entries(body).forEach(([key, value]) => {
			if (
				key === 'image' &&
				value instanceof FileList &&
				value.length > 0
			) {
				formData.append('image', value[0])
			} else {
				formData.append(key, String(value))
			}
		})

		const res = await axiosInstance.post('/news', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})

		if (res.status !== 201) throw new Error(res.data.message)
		return res.data
	}

	    public async delete(newsId: string) {
        const res = await axiosInstance.delete(`/news/${newsId}`)

        if (res.status !== 200) throw new Error(res.data.message);

        return res.data
    }
}

export const newsService = new NewsService()
