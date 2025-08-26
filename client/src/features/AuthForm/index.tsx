import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button, Modal } from '@/shared/components/ui'
import { FormInput } from '@/shared/components/ui/FormInput'
import { useAuth } from '@/shared/hooks'
import {
	type LoginSchema,
	type RegisterSchema,
	loginSchema,
	registerSchema
} from '@/shared/schemas'
import { useUserStore } from '@/shared/stores'

import './_authForm.scss'

export const AuthForm = () => {
	const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false)
	const [open, setOpen] = useState(false)
	const [isLogin, setIsLogin] = useState(true)
	const { registerMutation, loginMutation, isLoading } = useAuth()
	const fetchUser = useUserStore(state => state.fetchUser)

	const schema = useMemo(
		() => (isLogin ? loginSchema : registerSchema),
		[isLogin]
	)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<RegisterSchema | LoginSchema>({
		resolver: zodResolver(schema)
	})

	const onSubmit = async (data: RegisterSchema | LoginSchema) => {
		try {
			if (isLogin) {
				const res = await loginMutation(data as LoginSchema)
				if (res.message.includes('код')) {
					return setIsTwoFactorEnabled(true)
				}
			} else {
				await registerMutation(data as RegisterSchema)
			}
			setOpen(false)
		} catch (error) {
			console.log(error)
		} finally {
			fetchUser()
		}
	}

	return (
		<>
			<Button
				onClick={() => {
					setOpen(true)
					setIsLogin(true)
				}}
				text='Войти'
				className='header__controls-button'
			/>

			<Modal
				className='authForm'
				title={isLogin ? 'Вход' : 'Регистрация'}
				open={open}
				setOpen={setOpen}
			>
				<form
					className='authForm__form'
					onSubmit={handleSubmit(onSubmit)}
				>
					{!isLogin ? (
						<>
							<FormInput
								disabled={isLoading}
								label='Имя'
								name='name'
								register={register}
								errors={errors}
							/>
							<FormInput
								disabled={isLoading}
								label='Эл. почта'
								name='email'
								register={register}
								errors={errors}
							/>
							<FormInput
								disabled={isLoading}
								label='Номер телефона'
								name='phone'
								register={register}
								errors={errors}
							/>
						</>
					) : (
						<FormInput
							disabled={isLoading}
							label='Эл. почта или телефон'
							name='emailOrPhone'
							register={register}
							errors={errors}
						/>
					)}
					<FormInput
						disabled={isLoading}
						label='Пароль'
						type='password'
						name='password'
						register={register}
						errors={errors}
					/>
					{isTwoFactorEnabled && (
						<FormInput
							disabled={isLoading}
							label='Код'
							name='code'
							register={register}
							errors={errors}
						/>
					)}
					{isLogin ? (
						<Link
							className='authForm__link'
							to={'/auth/new-password'}
						>
							Забыли пароль?
						</Link>
					) : (
						<p className='authForm__agreement'>
							Регистрируясь, вы соглашаетесь с{' '}
							<Link to={'#'}>пользовательским соглашением</Link>
						</p>
					)}
					<Button
						disabled={isLoading}
						className='authForm__submit'
						type='submit'
						text={isLogin ? 'Войти' : 'Зарегистрироваться'}
					/>

					<button
						type='button'
						onClick={() => setIsLogin(!isLogin)}
						className='authForm__change'
					>
						{isLogin
							? 'Зарегистрироваться'
							: 'Я уже зарегистрирован'}
					</button>
				</form>
			</Modal>
		</>
	)
}
