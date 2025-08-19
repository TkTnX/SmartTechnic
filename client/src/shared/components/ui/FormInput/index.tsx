import { useState } from 'react'
import type { FieldErrors, FieldValues, UseFormRegister, Path } from 'react-hook-form'

import './_formInput.scss'
import { ShowPassword } from './components/ShowPassword'

type Props<TFormValues extends FieldValues> = {
	register?: UseFormRegister<TFormValues>
	errors?: FieldErrors<TFormValues>
	label: string
	name: Path<TFormValues>
	type?: string
	inputClassName?: string
	disabled?: boolean,
}
export const FormInput = <TFormValues extends FieldValues>({
	register,
	errors,
	label,
	name,
	type = 'text',
	inputClassName,
	disabled,
}: Props<TFormValues>) => {
	const [showPass, setShowPass] = useState(false)
	return (
		<label className='formInput'>
			<p className='formInput__label'>{label}</p>
			<div className='formInput__inputWrapper'>
				<input
					disabled={disabled}
					className={`${inputClassName} formInput__input`}
					type={type === 'password' && showPass ? 'text' : type}
					{...register?.(name)}
					
				/>
				{type === 'password' && (
					<ShowPassword
						showPass={showPass}
						setShowPass={setShowPass}
					/>
				)}
			</div>
			{errors && errors[name] && (
				<p className='formInput__error'>
					{errors[name]?.message as string}
				</p>
			)}
		</label>
	)
}
