import { create } from 'zustand'

import { userService } from '@/shared/services'
import type { IUser } from '@/shared/types'

type UserStore = {
	user: null | IUser
	error: null | string
	isLoading: boolean
	setUser: (user: IUser) => void
	fetchUser: () => Promise<void>
}

export const useUserStore = create<UserStore>(set => ({
	user: null,
	error: null,
	isLoading: false,
	setUser: (user: IUser) => set({ user }),
	fetchUser: async () => {
		set({ isLoading: true })
		try {
			const data = await userService.getProfile()

			set({ user: data, error: null })
		} catch (error) {
			console.log(error)
			set({ user: null, error: (error as Error).message })
		} finally {
			set({ isLoading: false })
		}
	}
}))
