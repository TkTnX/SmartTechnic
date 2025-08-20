import { axiosInstance } from "@/shared/libs";
import type { IPromo } from "@/shared/types";





export class PromoService {
    public async getPromos(): Promise<IPromo[]> {
        const res = await axiosInstance.get('/promos');

        if (res.status !== 200) throw new Error(res.data.message);
        
        return res.data
    }
    public async getPromo(promoId: string): Promise<IPromo> {
        const res = await axiosInstance.get(`/promos/${promoId}`)

        if (res.status !== 200) throw new Error(res.data.message);
        
        return res.data
    }
}

export const promoService = new PromoService()