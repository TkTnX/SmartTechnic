import { Order } from '@/entities'

import { useUserStore } from '@/shared/stores'

import './_ordersHistory.scss'

export const OrdersHistory = () => {
	const user = useUserStore(state => state.user)
	console.log(user?.orders)
	return (
		<section className='ordersHistory'>
			<h3 className='ordersHistory__title'>История покупок</h3>
			<div className='ordersHistory__list'>
				
				{user?.orders.map(order => (
					<Order key={order.id} order={order} />
				))}
			</div>
		</section>
	)
}
