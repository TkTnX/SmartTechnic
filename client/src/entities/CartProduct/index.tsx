import { ChangeQuantity, RemoveFromCart } from '@/features'

import type { IProduct } from '@/shared/types'

import './_cartProduct.scss'

type Props = {
	product: IProduct
	quantity: number
	cartProductId: string
}

export const CartProduct = ({ quantity, product, cartProductId }: Props) => {
	return (
		<div className='cartProduct'>
			<div className='cartProduct__left'>
				<img src={product.images[0]} alt={product.name} />
				<h6>{product.name}</h6>
			</div>
			<ChangeQuantity productQuantity={product.quantity} quantity={quantity} />
			<div >
				{product.oldPrice && (
					<p className='cartProduct__oldPrice'>{product.oldPrice}₽</p>
				)}
				<p className='cartProduct__price'>{product.price}₽</p>
			</div>
			<RemoveFromCart cartProductId={cartProductId} />
		</div>
	)
}
