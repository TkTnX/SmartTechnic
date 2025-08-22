import { Review } from '@/entities'

import type { IReview } from '@/shared/types'

import './_bigProductReviews.scss'
import { WriteReview } from '@/features'

type Props = {
	reviews: IReview[]
	productId: string
}

export const BigProductReviews = ({ reviews, productId }: Props) => {
	return (
		<div className='bigProductReviews'>
			<div className='bigProductReviews__list'>
				{reviews.length > 0 ? reviews.map(review => (
					<Review review={review} />
				)) : <p className='empty'>Отзывов пока нет. <br /> <span>Будьте первым</span></p>}
			</div>
			<WriteReview productId={productId} />
		</div>
	)
}
