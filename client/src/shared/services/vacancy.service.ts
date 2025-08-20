import { axiosInstance } from "@/shared/libs";
import type { IVacancy } from "@/shared/types";

class VacancyService {
    public async getVacancies(): Promise<IVacancy[]> {
        const res = await axiosInstance.get('/vacancies');

        if (res.status !== 200) throw new Error(res.data.message);
        
        return res.data

    }
}

export const vacancyService = new VacancyService()