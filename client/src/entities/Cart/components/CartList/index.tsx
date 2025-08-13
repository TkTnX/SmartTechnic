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
	return (
		<CartBlock
			step={step}
			setStep={setStep}
			blockStep={1}
			title='Ваш заказ'
			className='cartList'
		>
			{cartProducts.map(cartProduct => (
				<CartProduct
					key={cartProduct.id}
					product={cartProduct.product}
					quantity={cartProduct.quantity}
					cartProductId={cartProduct.id}
				/>
			))}
		</CartBlock>
	)
}
