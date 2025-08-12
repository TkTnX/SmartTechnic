import { Skeleton } from '@/shared/components'
import type { IProduct } from '@/shared/types'

import './_bigProduct.scss'
import { BigProductTop } from './components/BigProductTop'
import { BigProductTabs } from './components/BigProductTabs'

type Props = {
	product: IProduct
	isPending: boolean
}

export const BigProduct = ({ product, isPending }: Props) => {
	return (
		<section className='bigProduct'>
			{isPending ? (
				<div className='bigProduct__skeleton'>
					{[...new Array(2)].map((_, index) => (
						<Skeleton key={index} height={526} />
					))}
				</div>
			) : (
				<BigProductTop product={product} />
			)}
			<BigProductTabs />
		</section>
	)
}
