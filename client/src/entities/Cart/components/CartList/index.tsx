import { CartProduct } from '@/entities/CartProduct'

import { CartBlock } from '@/shared/components'
import type { ICartProduct } from '@/shared/types'

import './_cartList.scss'

type Props = {
	step: number
	setStep: (value: number) => void
	cartProducts: ICartProduct[]
}

export const CartList = ({ step, setStep, cartProducts }: Props) => {
	const blockStep = 1
	return (
		<CartBlock
			step={step}
			setStep={setStep}
			blockStep={blockStep}
			title='Ваш заказ'
			className='cartList'
		>
			<div className={`cartList__list ${step !== 1 ? 'small' : ''}`}>
				{cartProducts.length > 0 ? (
					cartProducts.map(cartProduct => (
						<CartProduct
							key={cartProduct.id}
							product={cartProduct.product}
							quantity={cartProduct.quantity}
							cartProductId={cartProduct.id}
							step={step}
							blockStep={1}
						/>
					))
				) : (
					<p className='empty'>Корзина пуста.</p>
				)}
			</div>
		</CartBlock>
	)
}
