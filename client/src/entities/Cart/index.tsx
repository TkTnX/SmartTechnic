import { useState } from 'react'

import { Skeleton } from '@/shared/components'
import { useUserStore } from '@/shared/stores'

import './_cart.scss'
import {
	CartList,
	Checkout,
	DeliveryInfo,
	PaymentType,
	ReceiverInfo
} from './components'

export const Cart = () => {

	// TODO: В инпуты автоматически вносить данные, если они указаны в профиле
	const { user, isLoading, error } = useUserStore()
	const [step, setStep] = useState(1)
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
