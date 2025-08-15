import { CartBlock, LabelInput } from '@/shared/components'
import { useCartStore } from '@/shared/stores'

import './_receiverInfo.scss'

type Props = {
	step: number
	setStep: (value: number) => void
}

export const ReceiverInfo = ({ step, setStep }: Props) => {
	const setOrderInfo = useCartStore(state => state.setOrderInfo)
	const blockStep = 4
	return (
		<CartBlock
			blockStep={blockStep}
			setStep={setStep}
			step={step}
			title='Получатель'
			className='receiverInfo'
		>
			<LabelInput
				setOrderInfo={setOrderInfo}
				className='receiverInfo__input'
				label='Имя'
				name='username'
			/>
			<LabelInput
				setOrderInfo={setOrderInfo}
				className='receiverInfo__input'
				label='Фамилия'
				name='userLastname'
			/>
			<LabelInput
				setOrderInfo={setOrderInfo}
				className='receiverInfo__input'
				label='Номер телефона'
				name='userPhone'
			/>
			<LabelInput
				setOrderInfo={setOrderInfo}
				className='receiverInfo__input'
				label='Эл. почта'
				name='userEmail'
			/>
		</CartBlock>
	)
}
