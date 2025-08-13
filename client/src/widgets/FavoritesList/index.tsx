import { Product } from '@/entities'
import { Link } from 'react-router-dom'

import { Skeleton } from '@/shared/components'
import { useUserStore } from '@/shared/stores'

import './_favoritesList.scss'

export const FavoritesList = () => {
	const { user, isLoading } = useUserStore()
	return (
		<section className='favoritesList'>
			<h1 className='favoritesList__title'>Избранное</h1>
			<div className='favoritesList__list'>
				{isLoading || !user ? (
					[...new Array(3)].map((_, index) => (
						<Skeleton key={index} height={596} />
					))
				) : user.favoriteProducts.length === 0 ? (
					<p className='empty'>
						У вас нет товаров в избранном. <br />{' '}
						<Link to={'/catalog'}>
							Найдите то, что вам нравится в каталоге!
						</Link>
					</p>
				) : (
					user.favoriteProducts.map(item => (
						<Product
							className='favoritesList__item'
							product={item.product!}
						/>
					))
				)}
			</div>
		</section>
	)
}
