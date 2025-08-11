import { useSearchParams } from 'react-router-dom'

import { FiltersItem, Skeleton } from '@/shared/components'
import { useSpecifications } from '@/shared/hooks'

import './_catalogFilters.scss'
import { PriceRange } from './components/PriceRange'

export const CatalogFilters = () => {
	const [searchParams] = useSearchParams()
	const category = searchParams.get('category')

	const { error, isPending, groupedSpecifications } =
		useSpecifications(category)
	return (
		<div className='catalogFilters'>
			<FiltersItem title='Цена, ₽'>
				<PriceRange />
			</FiltersItem>

			{category && isPending
				? [...new Array(2)].map((_, index) => (
						<Skeleton
							className='catalogFilters__skeleton'
							key={index}
							height={200}
						/>
					))
				: groupedSpecifications.map((specification, index) => (
						<FiltersItem
							key={index}
							items={specification.values}
							title={specification.title}
						/>
					))}

			{error && <p className='error'>{error.message}</p>}

			{!category && (
				<p className='catalogFilters__info'>
					Выберите категорию, чтобы видеть больше фильтров
				</p>
			)}
		</div>
	)
}
