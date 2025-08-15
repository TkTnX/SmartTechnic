import { CartBlock, DropdownInput } from '@/shared/components'
import { PAYMENT_TYPES } from '@/shared/constants'
import { useCartStore } from '@/shared/stores'

import './_paymentType.scss'

type Props = {
	step: number
	setStep: (value: number) => void
}

export const PaymentType = ({ step, setStep }: Props) => {
	const { setOrderInfo, orderInfo } = useCartStore()
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
				<h6 className='paymentType__title'>{orderInfo.paymentType === "card" ? "Карта" : "Наличными"}</h6>
			) : (
					<DropdownInput
						getValue={true}
					defaultValue={orderInfo.paymentType}
					setOrderInfo={setOrderInfo}
					className='paymentType__input'
					items={PAYMENT_TYPES}
					name='paymentType'
					label='Способ оплаты'
				/>
			)}
		</CartBlock>
	)
}
