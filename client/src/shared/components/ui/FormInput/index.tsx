import { useState } from 'react'
import type {
	FieldErrors,
	FieldValues,
	Path,
	UseFormRegister
} from 'react-hook-form'

import './_formInput.scss'
import { ShowPassword } from './components/ShowPassword'

interface Props<TFormValues extends FieldValues>
	extends React.InputHTMLAttributes<HTMLInputElement> {
	register?: UseFormRegister<TFormValues>
	errors?: FieldErrors<TFormValues>
	name: Path<TFormValues>
	registerOptions?: Parameters<UseFormRegister<TFormValues>>[1]
	label: string
	type?: string
	inputClassName?: string
	disabled?: boolean
}
export const FormInput = <TFormValues extends FieldValues>({
	register,
	registerOptions,
	errors,
	label,
	name,
	type = 'text',
	inputClassName,
	disabled,
	...props
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
					{...register?.(name, registerOptions)}
					{...props}
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
