import type { IProduct } from '@/shared/types'

import './_product.scss'

type Props = {
	product: IProduct
}

export const Product = ({ product }: Props) => {
	console.log(product.reviews)
	const rating =
		product.reviews &&
		Math.round(
			product.reviews?.reduce((acc, review) => acc + review.rating, 0) /
				product.reviews.length || 0
		)

	return (
		<div className='product'>
			<img src={product.images[0]} alt={product.name} />
			<p className='product__category'>{product.category.name}</p>
			<h6 className='product__title'>{product.name}</h6>
			{product.reviews && (
				<div className='product__rating'>
					{[...new Array(rating)].map((_, index) => (
						<img
							src='/images/icons/star-yellow.svg'
							alt='Звезда'
							key={index}
						/>
					))}
					{[...new Array(5 - rating)].map((_, index) => (
						<img
							src='/images/icons/star-gray.svg'
							alt='Звезда'
							key={index}
						/>
					))}
				</div>
			)}
		</div>
	)
}
