import { Product, Specification } from '@/entities'

import { CreateSpecification, Skeleton } from '@/shared/components'
import { useProducts } from '@/shared/hooks'
import type { ISpecification } from '@/shared/types'

import './_dashboardSpecificationsList.scss'

export const DashboardSpecificationsList = () => {
	const { error, isPending, products } = useProducts({}, true)
	if (error) return <p className='error'>{error.message}</p>
	return (
		<section className='dashboardSpecificationsList'>
			{isPending ? (
				[...new Array(6)].map((_, index) => (
					<Skeleton key={index} height={596} />
				))
			) : (
				<>
					{products!.map(product => (
						<div className='dashboardSpecificationsList__item'>
							<Product key={product.id} product={product} />
							<div className='dashboardSpecificationsList__specifications'>
								{product.specifications.map(
									(specification: ISpecification) => (
										<Specification
											className="dashboardSpecificationsList__specification"
											key={specification.id}
											specification={specification}
											isAdminPage={true}
										/>
									)
								)}
								<CreateSpecification categoryId={product.categoryId} productId={product.id} />
							</div>
						</div>
					))}
				</>
			)}
		</section>
	)
}
