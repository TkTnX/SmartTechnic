import { axiosInstance } from "@/shared/libs"
import type { ICategory } from "@/shared/types"

class CategoriesService {
    public async getCategories(): Promise<ICategory[]> {
        const res = await axiosInstance.get('/categories')

        if (res.status !== 200) throw new Error(res.data.message)

        return res.data
    }
}

export const categoriesService = new CategoriesService()