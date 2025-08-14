import { useState } from 'react'

import { CartBlock, DropdownInput } from '@/shared/components'
import { CITIES } from '@/shared/constants'

import { DeliveryInputs } from '../DeliveryInputs'
import { PickupAddresses } from '../PickupAddresses'

import './_deliveryInfo.scss'

type Props = {
	step: number
	setStep: (value: number) => void
}

export const DeliveryInfo = ({ step, setStep }: Props) => {
	const blockStep=2
	// TODO: Время доставки проверять, если стоит сегодняшний день, то не все времена показываются, а если другой, то все

	const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>(
		'delivery'
	)

	const TEMP_ADDRESS = 'г. Санкт-Петербург, Бульвар Новаторов, 75'
	const TEMP_TIME = 'воскресенье, 17, с 9:00 до 11:00'

	return (
		<CartBlock
			title='Способ получения'
			blockStep={blockStep}
			step={step}
			setStep={setStep}
			className='deliveryInfo'
		>
			<div className='deliveryInfo__wrapper'>
				{step !== 2 ? (
					<div className='deliveryInfo__small'>
						<h6>
							{deliveryType === 'delivery'
								? 'Доставка на адрес:'
								: 'Самовывоз из:'}
						</h6>
						{deliveryType === 'delivery' ? (
							<div className='deliveryInfo__small-address'>
								<p>{TEMP_ADDRESS}</p> <span>{TEMP_TIME}</span>
							</div>
						) : (
							<p>{TEMP_ADDRESS}</p>
						)}
					</div>
				) : (
					<>
						<div className='deliveryInfo__top'>
							<DropdownInput
								defaultValue={'spb'}
								items={CITIES}
								className='deliveryInfo__input'
								label='Ваш город'
								name='city'
							/>

							<div className='deliveryInfo__types'>
								<button
									onClick={() => setDeliveryType('delivery')}
									className={`deliveryInfo__type ${deliveryType === 'delivery' ? 'active' : ''}`}
								>
									<div className='deliveryInfo__type-dot' />
									Доставка
								</button>
								<button
									onClick={() => setDeliveryType('pickup')}
									className={`deliveryInfo__type ${deliveryType === 'pickup' ? 'active' : ''}`}
								>
									<div className='deliveryInfo__type-dot' />
									Самовывоз
								</button>
							</div>
						</div>

						<div className='deliveryInfo__bottom'>
							{deliveryType === 'delivery' ? (
								<DeliveryInputs />
							) : (
								<PickupAddresses />
							)}
						</div>
					</>
				)}
			</div>
		</CartBlock>
	)
}
