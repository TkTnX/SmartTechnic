import { useState } from 'react'

import { Skeleton } from '@/shared/components'
import { useUserStore } from '@/shared/stores'

import './_cart.scss'
import { CartList, Checkout } from './components'

export const Cart = () => {
	const { user, isLoading, error } = useUserStore()
	const [step, setStep] = useState(1)
	console.log(isLoading)
	return (
		<div className='cart'>
			<h1 className='cart__title'>Оформление заказа</h1>
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
						</div>
						<Checkout />
					</>
				)}
			</div>
		</div>
	)
}
