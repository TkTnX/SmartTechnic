import './_addToCart.scss'
import CartIcon from './images/cart.svg?react'

type Props = {
    productId: string
}

export const AddToCart = ({productId}: Props) => {
	return (
		<div className='addToCart'>
			<button className='addToCart__buy'>Купить в 1 клик</button>
			<button className='addToCart__add'>
				<CartIcon />
			</button>
		</div>
	)
}
