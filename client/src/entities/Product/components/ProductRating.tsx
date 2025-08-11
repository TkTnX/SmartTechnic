type Props = {
	rating: number | null
	totalReviews: number
}

export const ProductRating = ({ rating, totalReviews }: Props) => {
	return (
		<div className='product__rating'>
			<div className='product__stars'>
				{[...new Array(rating || 0)].map((_, index) => (
					<img
						src='/images/icons/star-yellow.svg'
						alt='Звезда'
						key={index}
					/>
				))}
				{[...new Array(5 - (rating || 0))].map((_, index) => (
					<img
						src='/images/icons/star-gray.svg'
						alt='Звезда'
						key={index}
					/>
				))}
			</div>
			<div className='product__rating-count'>
				<img src='/images/icons/message.svg' alt='Количество отзывов' />
				<span>({totalReviews})</span>
			</div>
		</div>
	)
}
