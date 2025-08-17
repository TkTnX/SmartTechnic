import type { CartStoreType } from '@/shared/stores'

import './_labelInput.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string,
	name: keyof CartStoreType['orderInfo'],
	setOrderInfo: (
		key: keyof CartStoreType['orderInfo'],
		value: CartStoreType['orderInfo'][keyof CartStoreType['orderInfo']]
	) => void
}

export const LabelInput = ({
	label,
	name,
	type = 'text',
	className,
	setOrderInfo,
	defaultValue
}: Props) => {
	return (
		<label className={`labelInput ${className}`}>
			{label}
			<input defaultValue={defaultValue} onChange={e => setOrderInfo(name, e.target.value)} type={type} name={name} className='labelInput__input' />
		</label>
	)
}
