import { useState } from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import type { LoginSchema, RegisterSchema } from '@/shared/schemas'

import './_formInput.scss'
import { ShowPassword } from './components/ShowPassword'

type Props = {
	register: UseFormRegister<LoginSchema | RegisterSchema>
	errors: FieldErrors<LoginSchema | RegisterSchema>
	label: string
	name: keyof LoginSchema | keyof RegisterSchema
	type?: string
	inputClassName?: string
}
export const FormInput = ({
	register,
	errors,
	label,
	name,
	type = 'text',
	inputClassName
}: Props) => {
	const [showPass, setShowPass] = useState(false)
	return (
		<label className='formInput'>
			<p className='formInput__label'>{label}</p>
			<div className='formInput__inputWrapper'>
				<input
					className={`${inputClassName} formInput__input`}
					type={type === 'password' && showPass ? 'text' : type}
					{...register(name)}
				/>
				{type === 'password' && (
					<ShowPassword
						showPass={showPass}
						setShowPass={setShowPass}
					/>
				)}
			</div>
			{errors[name as keyof typeof errors] && (
				<p className='formInput__error'>
					{errors[name as keyof typeof errors]!.message}
				</p>
			)}
		</label>
	)
}
