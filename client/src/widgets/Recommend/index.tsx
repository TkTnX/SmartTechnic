import { Product } from '@/entities'

import { Skeleton } from '@/shared/components'
import { useProducts } from '@/shared/hooks'

import './_recommend.scss'

type Props = {
	categoryId: string
}

export const Recommend = ({ categoryId }: Props) => {
	const { products, isPending, error } = useProducts({ category: categoryId })

	console.log(products, isPending, error)

	if (error) return null
	return (
		<section className='recommend'>
			<h2 className='recommend__title'>Рекомендуем</h2>

            <div className='recommend__list'>
                {isPending
				? [...new Array(4)].map((_, index) => (
						<Skeleton key={index} height={596} />
					))
				: products!.map(product => <Product product={product} />)}
            </div>
		</section>
	)
}
