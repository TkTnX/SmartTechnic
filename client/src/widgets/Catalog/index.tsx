
import { CatalogSettings } from '@/features'
import './_catalog.scss'
import { CatalogFilters } from './components/CatalogFilters'
import { CatalogList } from './components/CatalogList'

export const Catalog = () => {
	return (
		<section className='catalog'>
			<h2 className='catalog__title'>Каталог</h2>
			<div className='catalog__wrapper'>
				<CatalogFilters />
				<div className='catalog__right'>
					<CatalogSettings />
					<CatalogList />
				</div>
			</div>
		</section>
	)
}
