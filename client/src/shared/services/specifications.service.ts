import { axiosInstance } from "@/shared/libs"
import type { ISpecification } from "@/shared/types"

class SpecificationsService {
    async getSpecificationsByCategory(categoryId: string): Promise<ISpecification[]> {
        const res = await axiosInstance.get(`/specifications/${categoryId}`) 

        if (res.status !== 200) throw new Error(res.data.message)
        
        return res.data
    }
}

export const specificationsService = new SpecificationsService()
