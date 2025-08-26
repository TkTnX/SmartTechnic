import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import type { LoginSchema, RegisterSchema } from '@/shared/schemas'
import { authService } from '@/shared/services'
import type { ErrorType } from '@/shared/types'

export function useAuth() {
	const { mutateAsync: registerMutation, isPending: isRegisterPending } =
		useMutation({
			mutationFn: async (body: RegisterSchema) =>
				await authService.register(body),
			onError: (error: ErrorType) =>
				toast.error(error.response.data.message.toString()),
			onSuccess: () => toast.success('Вы успешно зарегистрировались')
		})

	const { mutateAsync: loginMutation, isPending: isLoginPending } =
		useMutation({
			mutationFn: async (body: LoginSchema) =>
				await authService.login(body),
			onError: (error: ErrorType) => {
				toast.error(error.response.data.message.toString())
			},
			onSuccess: data => {
				toast.success(data.message)
			}
		})

	const isLoading = isRegisterPending || isLoginPending

	return {
		registerMutation,
		loginMutation,
		isLoading
	}
}
