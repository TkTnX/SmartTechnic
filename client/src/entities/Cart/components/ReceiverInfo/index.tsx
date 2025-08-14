import { CartBlock, LabelInput } from '@/shared/components'

import './_receiverInfo.scss'

type Props = {
	step: number
	setStep: (value: number) => void
}

export const ReceiverInfo = ({ step, setStep }: Props) => {
	const blockStep = 4
	return (
		<CartBlock
			blockStep={blockStep}
			setStep={setStep}
			step={step}
            title='Получатель'
            className='receiverInfo'
        >
            
            <LabelInput className='receiverInfo__input' label='Имя' name='name' />
            <LabelInput className='receiverInfo__input' label='Фамилия' name='lastname' />
            <LabelInput className='receiverInfo__input' label='Номер телефона' name='phone' />
            <LabelInput className='receiverInfo__input' label='Эл. почта' name='email' />

        </CartBlock>
	)
}
