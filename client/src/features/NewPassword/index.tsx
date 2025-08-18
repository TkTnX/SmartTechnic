import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { FormInput } from '@/shared/components'
import { type NewPasswordSchema, newPasswordSchema } from '@/shared/schemas'
import { authService } from '@/shared/services'

import './_newPassword.scss'

export const NewPassword = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<NewPasswordSchema>({
		resolver: zodResolver(newPasswordSchema)
	})

	const { mutate, isPending, error } = useMutation({
		mutationFn: (data: NewPasswordSchema) =>
			authService.updatePassword(data),
		onSuccess: () => {
			toast.success('Пароль успешно изменен')
		},
		onError: (err: AxiosError<{ message: string }>) =>
			toast.error(err.response?.data.message[0])
	})

	return (
		<form
			className='newPassword'
			onSubmit={handleSubmit(data => mutate(data))}
		>
			<FormInput
				disabled={isPending}
				label='Введите старый пароль'
				name='oldPassword'
				register={register}
				errors={errors}
				type='password'
			/>
			<FormInput
				disabled={isPending}
				label='Введите новый пароль'
				name='newPassword'
				register={register}
				errors={errors}
				type='password'
			/>
			<FormInput
				disabled={isPending}
				label='Повторите новый пароль'
				name='repeatPassword'
				register={register}
				errors={errors}
				type='password'
			/>
			{/* TODO: Для синих кнопок сделать отдельный компонент */}
			<button
				disabled={isPending}
				className='newPassword__btn'
				type='submit'
			>
				Сохранить измененеия
			</button>
			{error && <p className='error'>{error.response?.data.message}</p>}
		</form>
	)
}
