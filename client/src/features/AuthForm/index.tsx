import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Modal } from '@/shared/components/ui'
import { FormInput } from '@/shared/components/ui/FormInput'
import {
	type LoginSchema,
	type RegisterSchema,
	loginSchema,
	registerSchema
} from '@/shared/schemas'

import './_authForm.scss'

export const AuthForm = () => {
	const [open, setOpen] = useState(false)
	const [isLogin, setIsLogin] = useState(true)

	const schema = useMemo(
		() => (isLogin ? loginSchema : registerSchema),
		[isLogin]
	)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<RegisterSchema | LoginSchema>({
		resolver: zodResolver(schema)
	})

	const onSubmit = async (data: RegisterSchema | LoginSchema) => {
		console.log(data)
		reset()
	}
	return (
		<>
			<button
				onClick={() => {
					setOpen(true)
					setIsLogin(true)
				}}
				className='header__controls-button'
			>
				Войти
			</button>

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
								label='Имя'
								name='name'
								register={register}
								errors={errors}
							/>
							<FormInput
								label='Эл. почта'
								name='email'
								register={register}
								errors={errors}
							/>
							<FormInput
								label='Номер телефона'
								name='phone'
								register={register}
								errors={errors}
							/>
						</>
					) : (
						<FormInput
							label='Эл. почта или телефон'
							name='emailOrPhone'
							register={register}
							errors={errors}
						/>
					)}
					<FormInput
						label='Пароль'
						type='password'
						name='password'
						register={register}
						errors={errors}
					/>
					{isLogin && (
						<Link
							className='authForm__link'
							to={'/auth/new-password'}
						>
							Забыли пароль?
						</Link>
					)}
					<button className='authForm__submit' type='submit'>
						{isLogin ? 'Войти' : 'Зарегистрироваться'}
					</button>
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
