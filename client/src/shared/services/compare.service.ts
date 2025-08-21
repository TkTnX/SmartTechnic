import { axiosInstance } from "@/shared/libs";

class CompareService {
    public async getCompareItems() {
        const res = await axiosInstance.get(`/compare`)

        if (res.status !== 200) throw new Error(res.data.message);
        
        return res.data
    }

    public async addToCompare(productId: string) {
        const res = await axiosInstance.post(`/compare/${productId}`)

        if (res.status !== 201) throw new Error(res.data.message);

        return res.data
    }
}

export const compareService = new CompareService()