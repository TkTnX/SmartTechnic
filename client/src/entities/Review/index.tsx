import type { IReview } from '@/shared/types'

import './_review.scss'

type Props = {
	review: IReview
}

export const Review = ({ review }: Props) => {
	return (
		<div className='review'>
			<div className='review__top'>
				{review.user.avatar ? (
					<img
						className='review__avatar'
						src={review.user.avatar}
						alt='avatar'
					/>
				) : (
					<div className='review__avatar'>{review.user.name[0]}</div>
				)}

				<div className='review__user-info'>
					<b>{review.user.name}</b>
					<p className='review__user-date'>
						{new Date(review.createdAt).toLocaleDateString(
							'ru-RU',
							{ day: '2-digit', month: 'long', year: 'numeric' }
						)}
					</p>
					<div className='review__stars'>
						{[...new Array(review.rating)].map((_, index) => (
							<img
								src='/images/icons/star-yellow.svg'
								alt='Звезда'
								key={index}
							/>
						))}

						<p>({review.rating} из 5)</p>
					</div>
				</div>
			</div>
			<div className='review__text'>
				<h5>{review.title}</h5>
				{review.comment && <p>{review.comment}</p>}
			</div>
		</div>
	)
}
