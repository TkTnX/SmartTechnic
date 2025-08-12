import { useState } from 'react'

import type { IProduct } from '@/shared/types'

import { BigProductReviews } from '../BigProductReviews'
import { BigProductSpecifications } from '../BigProductSpecifications'

import './_bigProductTabs.scss'

type Props = {
	product: IProduct
}

export const BigProductTabs = ({ product }: Props) => {
	const [activeTab, setActiveTab] = useState<
		'desc' | 'specifications' | 'reviews'
	>('desc')
	return (
		<div className='bigProductTabs'>
			<div className='bigProductTabs__tabs'>
				<button
					className={`bigProductTabs__tab ${activeTab === 'desc' ? 'active' : ''}`}
					onClick={() => setActiveTab('desc')}
				>
					Описание
				</button>
				{!!product.specifications.length && (
					<button
						className={`bigProductTabs__tab ${activeTab === 'specifications' ? 'active' : ''}`}
						onClick={() => setActiveTab('specifications')}
					>
						Характеристики
					</button>
				)}

				<button
					className={`bigProductTabs__tab ${activeTab === 'reviews' ? 'active' : ''}`}
					onClick={() => setActiveTab('reviews')}
				>
					Отзывы ({product.reviews.length})
				</button>
			</div>
			<div className='bigProductTabs__content'>
				{activeTab === 'desc' && (
					<div className='bigProductTabs__item'>
						<h3 className='bigProductTabs__title'>
							Описание {product.name}
						</h3>
						<p className='bigProductTabs__text'>
							{product.description}
						</p>
					</div>
				)}
				{activeTab === 'specifications' && (
					<div className='bigProductTabs__item'>
						<h3 className='bigProductTabs__title'>
							Характеристики {product.name}
						</h3>
						<BigProductSpecifications
							specifications={product.specifications}
						/>
					</div>
				)}
				{activeTab === 'reviews' && (
					<div className='bigProductTabs__item'>
						<h3 className='bigProductTabs__title'>
							Отзывы на {product.name}
						</h3>
						<BigProductReviews reviews={product.reviews} />
					</div>
				)}
			</div>
		</div>
	)
}
