import { useSearchParams } from 'react-router-dom'

import { FiltersSheet } from '@/shared/components/sheets'

import './_catalogSettings.scss'
import { CatalogSettingsFilters } from './components/CatalogSettingsFilters'
import { CatalogSettingsSort } from './components/CatalogSettingsSort'

export const CatalogSettings = () => {
	const [searchParams] = useSearchParams()

	const { sortBy, ...filters } = Object.fromEntries(searchParams)
	console.log(sortBy)
	return (
		<div className='catalogSort'>
			<FiltersSheet />
			{!!Object.keys(filters).length && (
				<CatalogSettingsFilters filters={filters} />
			)}
			<CatalogSettingsSort />
		</div>
	)
}
