import { Product } from '@/entities'

import { Skeleton } from '@/shared/components'
import { useUserStore } from '@/shared/stores'

import './_compare.scss'
import { CompareTable } from './components/CompareTable'

export const Compare = () => {
	const { user, isLoading } = useUserStore()

	if (isLoading) return <Skeleton height={600} />

	return (
		<section className='compare'>
			<h1 className='compare__title'>Сравнение товаров</h1>
			<div className='compare__wrapper'>
				<div className='compare__items'>
					{user?.compareItems.map(item => (
						<Product key={item.productId} product={item.product!} />
					))}
				</div>
				{user?.compareItems.length && user.compareItems.length > 1 ? (
					<CompareTable compareItems={user?.compareItems || []} />
				) : (
					<div className='compare__warning'>Минимум два товара для сравнения</div>
				)}
			</div>
		</section>
	)
}
