import { FiltersItem } from '@/shared/components'

import './_catalogFilters.scss'
import { PriceRange } from './components/PriceRange'

export const CatalogFilters = () => {
  // TODO: Получать specifications из БД
	return (
		<div className='catalogFilters'>
			<FiltersItem title='Цена, ₽'>
				<PriceRange />
			</FiltersItem>

			<p className='catalogFilters__info'>
				Выберите категорию, чтобы видеть больше фильтров
			</p>
		</div>
	)
}
