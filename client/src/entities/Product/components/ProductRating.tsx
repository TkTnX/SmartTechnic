import type { IReview } from '@/shared/types'

type Props = {
	reviews: IReview[]
}

export const ProductRating = ({ reviews }: Props) => {
	if (!reviews) return null

	const rating = Math.round(
		reviews?.reduce((acc, review) => acc + review.rating, 0) /
			reviews.length || 0
	)
	return (
		<div className='product__rating'>
			<div className='product__stars'>
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
			<div className='product__rating-count'>
				<img src='/images/icons/message.svg' alt='Количество отзывов' />
				<span>({reviews.length})</span>
			</div>
		</div>
	)
}
