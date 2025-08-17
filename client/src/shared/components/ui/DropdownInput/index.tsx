import type { FieldErrors, FieldValues, UseFormRegister, Path } from 'react-hook-form'

import type { CartStoreType } from '@/shared/stores'

import './_dropdownInput.scss'

interface Props<TFormValues extends FieldValues>
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	items: { value: string; label: string }[]
	name: keyof CartStoreType['orderInfo'] 
	setOrderInfo?: (
		key: keyof CartStoreType['orderInfo'],
		value: CartStoreType['orderInfo'][keyof CartStoreType['orderInfo']]
	) => void
	getValue?: boolean
	errors?: FieldErrors<TFormValues>
	register?: UseFormRegister<TFormValues>
}

export const DropdownInput = <TFormValues extends FieldValues>({
	label,
	name,
	items,
	value,
	className,
	defaultValue,
	setOrderInfo,
	getValue,
	errors,
	register,
	disabled
}: Props<TFormValues>) => {
	return (
		<label className={`dropdownInput ${className}`}>
			{label}
			<select
				{...register?.(name as Path<TFormValues>)}
				value={value}
				onChange={e => {
					setOrderInfo?.(name, e.target.value)
				}}
				defaultValue={defaultValue}
				name={name}
				className='dropdownInput__input'
				disabled={disabled}
			>
				{items.map(item => (
					<option
						value={getValue || (register && name !== "city") ? item.value : item.label}
						key={item.value}
					>
						{item.label}
					</option>
				))}
			</select>
			{errors?.[name] && (
				<p className='formInput__error'>
					{errors[name]?.message as string}
				</p>
			)}
		</label>
	)
}
