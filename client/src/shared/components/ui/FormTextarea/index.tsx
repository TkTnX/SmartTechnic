import type {
	FieldErrors,
	FieldValues,
	Path,
	UseFormRegister
} from 'react-hook-form'

import './_formTextarea.scss'

type Props<TFormValues extends FieldValues> = {
	register?: UseFormRegister<TFormValues>
	errors?: FieldErrors<TFormValues>
	label: string
	name: Path<TFormValues>
	className?: string
	disabled?: boolean
	defaultValue?: string
}
export const FormTextarea = <TFormValues extends FieldValues>({
	label,
	name,
	register,
	errors,
	className,
	disabled,
	defaultValue
}: Props<TFormValues>) => {
	return (
		<label className={`formTextarea ${className}`}>
			<p className='formTextarea__label'>{label}</p>
			<textarea
				defaultValue={defaultValue}
				disabled={disabled}
				{...register?.(name)}
				name={name}
				className={` formTextarea__input`}
			/>
			{errors && errors[name] && (
				<p className='formInput__error'>
					{errors[name]?.message as string}
				</p>
			)}
		</label>
	)
}
