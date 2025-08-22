import { WriteReviewMenu } from '@/shared/components'

import './_writeReview.scss'

type Props = {
	productId: string
}

export const WriteReview = ({ productId }: Props) => {
	return (
		<div className='writeReview'>
			<h5 className='writeReview__title'>
				Напишите своё мнение о товаре
			</h5>
			<p className='writeReview__subtitle'>
				Сделайте выбор других покупалетей легче
			</p>
			<WriteReviewMenu  productId={productId} />
		</div>
	)
}
