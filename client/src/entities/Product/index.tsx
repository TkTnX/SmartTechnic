import { AddToCart } from '@/features'
import { Link } from 'react-router-dom'

import type { IProduct } from '@/shared/types'

import './_product.scss'
import { ProductControls } from './components/ProductControls'
import { ProductPrice } from './components/ProductPrice'
import { ProductRating } from './components/ProductRating'

type Props = {
	product: IProduct
	className?: string
}

export const Product = ({ product, className }: Props) => {
	return (
		<div className={`${className} product `}>
			<div className='product__top'>
				<Link to={`/product/${product.id}`} className='product__image'>
					<img src={product.images[0]} alt={product.name} />
				</Link>
				<p className='product__category'>{product.category.name}</p>
				<Link to={`/product/${product.id}`} className='product__title'>
					{product.name}
				</Link>
				<ProductRating
					rating={product.rating}
					totalReviews={product.reviews.length}
				/>

				<div className='product__info'>
					<ProductPrice oldPrice={product.oldPrice} price={product.price} />
					<ProductControls productId={product.id} />
				</div>
			</div>
			<AddToCart productId={product.id} />
		</div>
	)
}
