import type { CartStoreType } from '@/shared/stores'

import './_dropdownInput.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	items: { value: string; label: string }[]
	name: keyof CartStoreType['orderInfo']
	setOrderInfo: (
		key: keyof CartStoreType['orderInfo'],
		value: CartStoreType['orderInfo'][keyof CartStoreType['orderInfo']]
	) => void
	getValue?: boolean
}

export const DropdownInput = ({
	label,
	name,
	items,
	value,
	className,
	defaultValue,
	setOrderInfo,
	getValue
}: Props) => {
	return (
		<label className={`dropdownInput ${className}`}>
			{label}
			<select
				value={value}
				onChange={e => setOrderInfo(name, e.target.value)}
				defaultValue={defaultValue}
				name={name}
				className='dropdownInput__input'
			>
				{items.map(item => (
					<option value={getValue ? item.value : item.label} key={item.value}>
						{item.label}
					</option>
				))}
			</select>
		</label>
	)
}
