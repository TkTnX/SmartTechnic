import { Link } from 'react-router-dom'

import { useCartStore } from '@/shared/stores'
import type { ICartProduct } from '@/shared/types'

import './_checkout.scss'

type Props = { cartProducts: ICartProduct[] }

export const Checkout = ({ cartProducts }: Props) => {
	const orderInfo = useCartStore(state => state.orderInfo)
	const totalPrice = cartProducts.reduce(
		(acc, product) => acc + product.product.price * product.quantity,
		0
	)

	const onSubmit = () => {
		console.log(orderInfo)
	}

	return (
		<div className='checkout'>
			<h4 className='checkout__title'>Итого</h4>
			<div className='checkout__list'>
				<div className='checkout__item'>
					<p className='checkout__item-title'>
						{cartProducts.length} товара на сумму
					</p>
					<p className='checkout__item-value'>{totalPrice}₽</p>
				</div>
				<div className='checkout__item'>
					<p className='checkout__item-title'>Стоимость доставки</p>
					<p className='checkout__item-value'>бесплатно</p>
				</div>
			</div>
			<div className='checkout__total'>
				<p className='checkout__total-text'>К оплате</p>
				<p className='checkout__total-price'>{totalPrice}₽</p>
			</div>
			<button
				onClick={onSubmit}
				disabled={Object.values(orderInfo).includes(null)}
				className='checkout__submit'
			>
				Оформить заказ
			</button>
			<label className='checkout__agreement'>
				<input type='checkbox' />
				<span>
					Подтверждая заказ, я принимаю условия{' '}
					<Link to={'/agreement'}>пользовательского соглашения</Link>
				</span>
			</label>
		</div>
	)
}
