import { CartBlock, DropdownInput } from '@/shared/components'
import { CITIES } from '@/shared/constants'
import { useCartStore } from '@/shared/stores'

import { DeliveryInputs } from '../DeliveryInputs'
import { PickupAddresses } from '../PickupAddresses'

import './_deliveryInfo.scss'

type Props = {
	step: number
	setStep: (value: number) => void
}

export const DeliveryInfo = ({ step, setStep }: Props) => {
	const { orderInfo, setOrderInfo } = useCartStore()
	const blockStep = 2
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
							{orderInfo.deliveryType === 'DELIVERY'
								? 'Доставка на адрес:'
								: 'Самовывоз из:'}
						</h6>
						{orderInfo.deliveryType === 'DELIVERY' ? (
							<div className='deliveryInfo__small-address'>
								<p>
									{orderInfo.city}, {orderInfo.street}
								</p>{' '}
								<span>{orderInfo.deliveryTime}</span>
							</div>
						) : (
							<p>
								{orderInfo.city}, {orderInfo.street}
							</p>
						)}
					</div>
				) : (
					<>
						<div className='deliveryInfo__top'>
							<DropdownInput
								setOrderInfo={setOrderInfo}
								defaultValue={
									orderInfo.city || 'Санкт-Петербург'
								}
								items={CITIES}
								className='deliveryInfo__input'
								label='Ваш город'
								name='city'
							/>

							<div className='deliveryInfo__types'>
								<button
									onClick={() =>
										setOrderInfo('deliveryType', 'DELIVERY')
									}
									className={`deliveryInfo__type ${orderInfo.deliveryType === 'DELIVERY' ? 'active' : ''}`}
								>
									<div className='deliveryInfo__type-dot' />
									Доставка
								</button>
								<button
									onClick={() =>
										setOrderInfo('deliveryType', 'PICKUP')
									}
									className={`deliveryInfo__type ${orderInfo.deliveryType === 'PICKUP' ? 'active' : ''}`}
								>
									<div className='deliveryInfo__type-dot' />
									Самовывоз
								</button>
							</div>
						</div>

						<div className='deliveryInfo__bottom'>
							{orderInfo.deliveryType === 'DELIVERY' ? (
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
