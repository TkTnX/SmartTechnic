import { Product } from '@/entities'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { Skeleton } from '@/shared/components'
import { productsService } from '@/shared/services'

import './_productsSection.scss'

type Props = {
	title: string
	link: string
	query: Record<string, string>
}

export const ProductsSection = ({ title, link, query }: Props) => {
	// TODO: Перенести в хук
	const {
		data: products,
		error,
		isLoading
	} = useQuery({
		queryKey: [title],
		queryFn: async () => await productsService.getProducts(query)
	})

	return (
		<section className='section'>
			<div className='section__top'>
				<h2 className='section__title'>{title}</h2>
				<Link className='section__link' to={link}>
					Все товары{' '}
					<img src='/images/icons/right.svg' alt='Все товары' />{' '}
				</Link>
			</div>
			{error ? (
				<p className='error'>{error.message}</p>
			) : (
				<div className='section__items'>
					{isLoading
						? [...new Array(4)].map((_, index) => (
								<Skeleton key={index} height={596} />
							))
						: products!.map(product => (
								<Product key={product.id} product={product} />
							))}
				</div>
			)}
		</section>
	)
}
