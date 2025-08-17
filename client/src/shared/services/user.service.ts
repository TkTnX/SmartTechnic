import { axiosInstance } from '@/shared/libs'
import type { PersonalSchema } from '@/shared/schemas'

class UserService {
	async getProfile() {
		const res = await axiosInstance.get('/user/profile')

		if (res.status !== 200) throw new Error(res.data.message)
		return res.data
	}

	async updateProfile(data: PersonalSchema) {
		const res = await axiosInstance.patch('/user', data)

		if (res.status !== 200) throw new Error(res.data.message)
		return res.data
	}
}

export const userService = new UserService()
