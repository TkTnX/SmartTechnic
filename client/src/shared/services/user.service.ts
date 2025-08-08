import { axiosInstance } from '@/shared/libs'

class UserService {
	async getProfile() {
		const res = await axiosInstance.get('/user/profile')

		if (res.status !== 200) throw new Error(res.data.message)
		return res.data
	}
}

export const userService = new UserService()
