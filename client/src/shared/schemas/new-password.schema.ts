import z from 'zod'

export const newPasswordSchema = z
	.object({
		oldPassword: z
			.string()
			.nonempty('Введите старый пароль!')
			.min(6, 'Пароль должен быть не менее 6 символов!'),
		newPassword: z
			.string()
			.nonempty('Новый пароль обязательный!')
			.min(6, 'Пароль должен быть не менее 6 символов!'),
		repeatPassword: z
			.string()
			.nonempty('Повторите пароль!')
			.min(6, 'Пароль должен быть не менее 6 символов!')
	})
	.refine(
		values => {
			return values.newPassword === values.repeatPassword
		},
		{ message: 'Пароли не совпадают!', path: ['repeatPassword'] }
	)

export type NewPasswordSchema = z.infer<typeof newPasswordSchema>
