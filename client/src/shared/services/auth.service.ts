import { axiosInstance } from "@/shared/libs";
import type { LoginSchema, RegisterSchema } from "@/shared/schemas";

class AuthService {
    async register(body: RegisterSchema) {
        const res = await axiosInstance.post('/auth/register', body)

        if(res.status !== 200) throw new Error(res.data.message)

        return res.data
    }
    async login(body: LoginSchema) {
        const res = await axiosInstance.post('/auth/login', body)

        if(res.status !== 200) throw new Error(res.data.message)

        return res.data
    }
}

export const authService = new AuthService()