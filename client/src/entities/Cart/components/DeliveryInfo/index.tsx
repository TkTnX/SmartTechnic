import { CartBlock } from '@/shared/components'

import './_deliveryInfo.scss'

type Props = {
	step: number
	setStep: (value: number) => void
}

export const DeliveryInfo = ({ step, setStep }: Props) => {
	return (
		<CartBlock
			title='Способ получения'
			blockStep={2}
			step={step}
			setStep={setStep}
		></CartBlock>
	)
}
