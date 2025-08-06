import { AddToCart } from '@/features'

import type { IProduct } from '@/shared/types'

import './_product.scss'
import { ProductControls } from './components/ProductControls'
import { ProductRating } from './components/ProductRating'
import { Link } from 'react-router-dom'

type Props = {
	product: IProduct
}

export const Product = ({ product }: Props) => {
	return (
		<div className='product'>
			<div className='product__top'>
				<img src={product.images[0]} alt={product.name} />
				<p className='product__category'>{product.category.name}</p>
				<Link to={`/product/${product.id}`} className='product__title'>{product.name}</Link>
				<ProductRating reviews={product.reviews} />

				<div className='product__info'>
					<div className='product__info-price'>
						{product.oldPrice && (
							<p className='product__oldPrice'>
								{product.oldPrice}₽
							</p>
						)}
						<p className='product__price'>{product.price}₽</p>
						{product.oldPrice && (
							<p className='product__difference'>
								-{product.oldPrice - product.price}₽
							</p>
						)}
					</div>
					<ProductControls productId={product.id} />
				</div>
			</div>
			<AddToCart productId={product.id} />
		</div>
	)
}
