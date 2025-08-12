import './_addToCart.scss'
import CartIcon from './images/cart.svg?react'

type Props = {
	productId: string
	isBig?: boolean
}

export const AddToCart = ({productId, isBig}: Props) => {
	return (
		<div className='addToCart'>
			<button className='addToCart__buy'>Купить в 1 клик</button>
			<button className='addToCart__add'>
				{isBig ? 'В корзину' : <CartIcon />}
			</button>
		</div>
	)
}
