import { axiosInstance } from "@/shared/libs"
import type { CategorySchema } from "@/shared/schemas"
import type { ICategory } from "@/shared/types"

class CategoriesService {
    public async getCategories(): Promise<ICategory[]> {
        const res = await axiosInstance.get('/categories')

        if (res.status !== 200) throw new Error(res.data.message)

        return res.data
    }

    public async createCategory(data: CategorySchema): Promise<ICategory> {
        const res = await axiosInstance.post('/categories', data)

        if (res.status !== 201) throw new Error(res.data.message)
        
        return res.data
    }

    public async delete(categoryId: string) {
        const res = await axiosInstance.delete(`/categories/${categoryId}`)

        if (res.status !== 200) throw new Error(res.data.message);

        return res.data
    }
}

export const categoriesService = new CategoriesService()