import { useState } from 'react'
import { Link } from 'react-router-dom'

import { getEnding, getOrderStatus } from '@/shared/helpers'
import type { IOrder } from '@/shared/types'

import './_order.scss'

type Props = {
	order: IOrder
}

export const Order = ({ order }: Props) => {
	const [open, setOpen] = useState(false)
	return (
		<div className={`order ${open ? 'open' : ''}`}>
			<button onClick={() => setOpen(!open)} className={`order__trigger`}>
				<p className='order__id'>
					Заказ №{order.id.slice(0, 5)}{' '}
					<span>
						от{' '}
						{new Date(order.createdAt).toLocaleDateString('ru-RU', {
							day: '2-digit',
							month: '2-digit',
							year: 'numeric'
						})}
					</span>
				</p>
				<p className='order__summary'>
					{getEnding(order.orderItems.length, 'товар')} на сумму {order.totalPrice}
					₽
				</p>
				<p
					style={{ color: getOrderStatus(order.status).color }}
					className='order__status'
				>
					{getOrderStatus(order.status).label}
				</p>
				<img
					className={`order__arrow ${open ? 'open' : ''}`}
					src='/images/icons/chevron-right.svg'
					alt='Стрелка'
				/>
			</button>
			<div className={`order__content ${open ? 'open' : ''}`}>
				<div className='order__items'>
					{order.orderItems.map(item => (
						<Link
							className='order__item'
							to={`/product/${item.product?.id}`}
						>
							<img
								src={item.product?.images[0]}
								alt={item.product?.name}
							/>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
