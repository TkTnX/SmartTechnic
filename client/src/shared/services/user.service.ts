import { axiosInstance } from '@/shared/libs'
import type { PersonalSchema } from '@/shared/schemas'

class UserService {
	async getProfile() {
		const res = await axiosInstance.get('/user/profile')

		if (res.status !== 200) throw new Error(res.data.message)
		return res.data
	}

	async updateProfile(data: PersonalSchema) {
		const formData = new FormData()

		Object.entries(data).forEach(([key, value]) => {
			if (
				key === 'avatar' &&
				value instanceof FileList &&
				value.length > 0
			) {
				formData.append('avatar', value[0])
			} else {
				formData.append(key, String(value))
			}
		})

		const res = await axiosInstance.patch('/user', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})

		if (res.status !== 200) throw new Error(res.data.message)
		return res.data
	}
}

export const userService = new UserService()
