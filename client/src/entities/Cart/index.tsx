import { useEffect, useState } from 'react'

import { Skeleton } from '@/shared/components'
import { useCartStore, useUserStore } from '@/shared/stores'

import './_cart.scss'
import {
	CartList,
	Checkout,
	DeliveryInfo,
	PaymentType,
	ReceiverInfo
} from './components'

export const Cart = () => {

	const { user, isLoading, error } = useUserStore()
	const setManyOrderInfo = useCartStore(state => state.setManyOrderInfo)
	const [step, setStep] = useState(1)

	useEffect(() => {
			setManyOrderInfo({
				username: user?.name,
				userPhone: user?.phone,
				userEmail: user?.email,
				city: user?.city,
				index: user?.index,
				deliveryType: user?.deliveryType,
				paymentType: user?.paymentType
				, street: user?.address,
				
			})
		}, [setManyOrderInfo, user])
	return (
		<div className='cart'>
			<h1 className='cart__title'>Оформление заказа</h1>
			{user?.cartProducts?.length === 0 ? (
				<p className='empty'>Корзина пуста.</p>
			) : (
				<div className='cart__wrapper'>
					{isLoading || (!user && !error) ? (
						[...new Array(2)].map((_, index) => (
							<Skeleton key={index} height={596} />
						))
					) : (
						<>
							<div className='cart__steps'>
								<CartList
									cartProducts={user!.cartProducts!}
									setStep={setStep}
									step={step}
								/>
								<DeliveryInfo step={step} setStep={setStep} />
								<PaymentType step={step} setStep={setStep} />
								<ReceiverInfo step={step} setStep={setStep} />
							</div>
							<Checkout cartProducts={user!.cartProducts!} />
						</>
					)}
				</div>
			)}
		</div>
	)
}
