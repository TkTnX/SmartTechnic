import { ChangeQuantity, RemoveFromCart } from '@/features'

import type { IProduct } from '@/shared/types'

import './_cartProduct.scss'

type Props = {
	product: IProduct
	quantity: number
	cartProductId: string
	step?: number
	blockStep?: number
}

export const CartProduct = ({
	quantity,
	product,
	cartProductId,
	step,
	blockStep
}: Props) => {
	return (
		<div className='cartProduct'>
			{step !== blockStep ? (
				<img className='cartProduct__image-small' src={product.images[0]} alt={product.name} />
			) : (
				<>
					{' '}
					<div className='cartProduct__left'>
						<img src={product.images[0]} alt={product.name} />
						<h6>{product.name}</h6>
					</div>
					<ChangeQuantity
						cartProductId={cartProductId}
						productQuantity={product.quantity}
						quantity={quantity}
					/>
					<div>
						{product.oldPrice && (
							<p className='cartProduct__oldPrice'>
								{product.oldPrice}₽
							</p>
						)}
						<p className='cartProduct__price'>{product.price}₽</p>
					</div>
					<RemoveFromCart cartProductId={cartProductId} />
				</>
			)}
		</div>
	)
}
