import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, FormInput } from '@/shared/components'
import { authService } from '@/shared/services'

import './_forgotPasswordForm.scss'

export const ForgotPasswordForm = () => {
	const [searchParams] = useSearchParams()
	const token = searchParams.get('token')
	const email = searchParams.get('email')
	const isPassInput = token && email
	const { mutate } = useMutation({
		mutationFn: (data: { email?: string; password?: string }) =>
			!isPassInput
				? authService.forgotPassword(data.email!)
				: authService.forgotPassword(email, token, data.password),
		onSuccess: () => {
			if (isPassInput) {
				toast.success('Пароль успешно изменен')
				location.replace('/')
			} else {
				toast.success('Письмо отправлено вам на почту')
			}
		},
		onError: err => toast.error(err.message)
	})

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<{ email?: string; password?: string }>()

	return (
		<section className='forgotPasswordForm'>
			<div className='forgotPasswordForm__block'>
				<h2 className='forgotPasswordForm__title'>
					Восстановление пароля
				</h2>
				<form
					onSubmit={handleSubmit(data => mutate(data))}
					className='forgotPasswordForm__form'
				>
					{isPassInput ? (
						<FormInput
							errors={errors}
							register={register}
							name='password'
							label='Пароль'
							type='password'
						/>
					) : (
						<FormInput
							errors={errors}
							register={register}
							name='email'
							label='Почта'
							type='email'
						/>
					)}

					<Button text='Восстановить' />
				</form>
			</div>
		</section>
	)
}
