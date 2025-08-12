import { ProductControls } from '@/entities/Product/components/ProductControls'
import { ProductPrice } from '@/entities/Product/components/ProductPrice'
import { ProductRating } from '@/entities/Product/components/ProductRating'
import { AddToCart } from '@/features'
import { useState } from 'react'

import type { IProduct } from '@/shared/types'

type Props = {
	product: IProduct
}

export const BigProductTop = ({ product }: Props) => {
	const [currImage, setCurrImage] = useState(0)
	return (
		<div className='bigProduct__top'>
			<div className='bigProduct__imagesWrapper'>
				<img src={product.images[currImage]} alt={product.name} />

				<div className='bigProduct__images'>
					{product.images.map((image, index) => (
						<button
							onClick={() => setCurrImage(index)}
							className='bigProduct__image'
						>
							<img src={image} key={index} alt={product.name} />
						</button>
					))}
				</div>
			</div>

			<div className='bigProduct__info'>
				<h1 className='bigProduct__name'>{product.name}</h1>

				<div className='bigProduct__controls'>
					<div className='bigProduct__controls-top'>
						<ProductRating
							rating={product.rating}
							totalReviews={product.reviews.length}
						/>
						<ProductControls productId={product.id} />
					</div>
					<div className='bigProduct__controls-bottom'>
						<ProductPrice
							oldPrice={product.oldPrice}
							price={product.price}
						/>
						<AddToCart isBig={true} productId={product.id} />
					</div>
				</div>

				<div className='bigProduct__additionals'>
					<div className='bigProduct__additional'>
						<div className='bigProduct__additional-title'>
							<img
								src='/images/icons/shipping.svg'
								alt='доставка'
							/>
							<p>Доставка</p>
						</div>
						<p className='bigProduct__additional-text'>
							Доставим по Санкт-Петербургу в течение 2 часов и
							бесплатно. Стоимость доставки в другие города
							уточняйте у менеджера.
						</p>
					</div>
					<div className='bigProduct__additional'>
						<div className='bigProduct__additional-title'>
							<img src='/images/icons/purse.svg' alt='доставка' />
							<p>Оплата</p>
						</div>
						<p className='bigProduct__additional-text'>
							Принимаем к оплате как наличный, так и безналичный
							расчёт. Возможна оплата электронными кошельками.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
