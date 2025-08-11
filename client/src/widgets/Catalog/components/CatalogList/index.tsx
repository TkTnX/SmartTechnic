import { Product } from '@/entities'

import { Skeleton } from '@/shared/components'
import { useProducts } from '@/shared/hooks'

import './_catalogList.scss'

export const CatalogList = () => {
	const { products, error, isPending } = useProducts()

	if (error) return <p className='error'>{error.message}</p>

	return (
		<div className='catalogList'>
			{isPending
				? [...new Array(6)].map((_, index) => (
						<Skeleton key={index} height={596} />
					))
				: products!.map(product => (
						<Product className='catalogList__item' key={product.id} product={product} />
					))}
		</div>
	)
}
