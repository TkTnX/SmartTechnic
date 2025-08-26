import { axiosInstance } from '@/shared/libs'
import type {
	LoginSchema,
	NewPasswordSchema,
	RegisterSchema
} from '@/shared/schemas'

class AuthService {
	async register(body: RegisterSchema) {
		const res = await axiosInstance.post('/auth/register', body)

		if (res.status !== 200) throw new Error(res.data.message)

		return res.data
	}
	async login(body: LoginSchema) {
		const res = await axiosInstance.post('/auth/login', body)

		if (res.status !== 200) throw new Error(res.data.message)

		return res.data
	}

	async logout() {
		const res = await axiosInstance.post('/auth/logout')

		if (res.status !== 200) throw new Error(res.data.message)

		return res.data
	}

	async updatePassword(body: NewPasswordSchema) {
		const res = await axiosInstance.patch('/auth/new-password', body)

		if (res.status !== 200) throw new Error(res.data.message)

		return res.data
	}

	public async verifyEmail(email: string, token?: string) {
		const res = await axiosInstance.post(`/auth/verify-email`, {
			email,
			token
		})

		if (res.status !== 201) throw new Error(res.data.message)

		return res.data
	}

	public async forgotPassword(
		email: string,
		token?: string,
		password?: string
	) {
		const res = await axiosInstance.post(`/auth/forgot-password`, {
			email,
			token,
			password
		})

		if (res.status !== 201) throw new Error(res.data.message)

		return res.data
	}
}

export const authService = new AuthService()
