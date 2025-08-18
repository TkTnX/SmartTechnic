import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { cartService } from '@/shared/services'
import { useCartStore } from '@/shared/stores'
import type { ICartProduct } from '@/shared/types'

import './_checkout.scss'
import { useState } from 'react'

type Props = { cartProducts: ICartProduct[] }

export const Checkout = ({ cartProducts }: Props) => {
	const [isChecked, setIsChecked] = useState(false)
	const navigate = useNavigate()
	const orderInfo = useCartStore(state => state.orderInfo)
	const totalPrice = cartProducts.reduce(
		(acc, product) => acc + product.product.price * product.quantity,
		0
	)

	const { mutate } = useMutation({
		mutationFn: async () =>
			await cartService.createOrder(orderInfo, totalPrice),
		onSuccess: (data: { paymentUrl: string; orderId: string }) => {
			if (orderInfo.paymentType === 'CARD' ) {
				window.location.href = data.paymentUrl
			} else {
				navigate(`/profile/history`)
			}
		},
		onError: (err: AxiosError<{ message: string }>) => {
			toast.error(err.response?.data.message[0])
		}
	})

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
				onClick={() => mutate()}
				disabled={Object.values(orderInfo).includes(null) || !isChecked}
				className='checkout__submit'
			>
				Оформить заказ
			</button>
			<label className='checkout__agreement'>
				<input onChange={e => setIsChecked(e.target.checked)} type='checkbox' />
				<span>
					Подтверждая заказ, я принимаю условия{' '}
					<Link to={'/agreement'}>пользовательского соглашения</Link>
				</span>
			</label>
		</div>
	)
}
