import { useState } from 'react'

import { CartBlock, DropdownInput } from '@/shared/components'
import { PAYMENT_TYPES } from '@/shared/constants'

import './_paymentType.scss'

type Props = {
	step: number
	setStep: (value: number) => void
}

export const PaymentType = ({ step, setStep }: Props) => {
	const [paymentType, setPaymentType] = useState<'cash' | 'card'>('cash')
	const blockStep = 3
	return (
		<CartBlock
			blockStep={blockStep}
			title='Способ оплаты'
			step={step}
			setStep={setStep}
			className='paymentType'
		>
			{blockStep !== step ? (
				<h6 className='paymentType__title'>{paymentType === 'cash' ? 'Наличные' : 'Карта'}</h6>
			) : (
				<DropdownInput
					className='paymentType__input'
					items={PAYMENT_TYPES}
					label='Способ оплаты'
				/>
			)}
		</CartBlock>
	)
}
