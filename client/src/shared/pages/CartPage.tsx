import { Cart } from '@/entities'

import { Breadcrumbs } from '@/shared/components'

export const CartPage = () => {
	return (
		<>
			<Breadcrumbs items={[{ title: 'Корзина' }]} />
			<Cart />
		</>
	)
}
