import { Product } from '@/entities'

import { CreateProduct, Skeleton } from '@/shared/components'
import { useProducts } from '@/shared/hooks'

import './_dashboardProductList.scss'

export const DashboardProductList = () => {
	const { products, error, isPending } = useProducts()

	if (error) return <p className='error'>{error.message}</p>
	return (
		<div className='dashboardProductList'>
			{isPending ? (
				[...new Array(6)].map((_, index) => (
					<Skeleton key={index} height={596} />
				))
			) : (
				<>
					<CreateProduct />
					{products!.map(product => (
						<Product
							className='dashboardProductList__item'
							key={product.id}
							product={product}
						/>
					))}
				</>
			)}
		</div>
	)
}
