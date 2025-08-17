import { CartBlock, LabelInput } from '@/shared/components'
import { useCartStore } from '@/shared/stores'

import './_receiverInfo.scss'

type Props = {
	step: number
	setStep: (value: number) => void
}

export const ReceiverInfo = ({ step, setStep }: Props) => {
	const {setOrderInfo, orderInfo} = useCartStore()
	const blockStep = 4
	console.log(orderInfo)
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
				defaultValue={orderInfo.username || ''}
			/>
			<LabelInput
				setOrderInfo={setOrderInfo}
				className='receiverInfo__input'
				label='Индекс'
				name='index'
				defaultValue={orderInfo.index || ''}
			/>
			<LabelInput
				setOrderInfo={setOrderInfo}
				className='receiverInfo__input'
				label='Номер телефона'
				name='userPhone'
				defaultValue={orderInfo.userPhone || ''}
			/>
			<LabelInput
				setOrderInfo={setOrderInfo}
				className='receiverInfo__input'
				label='Эл. почта'
				name='userEmail'
				defaultValue={orderInfo.userEmail || ''}
			/>
		</CartBlock>
	)
}
