import { useSearchParams } from 'react-router-dom'

import './_catalogSettings.scss'
import { CatalogSettingsFilters } from './components/CatalogSettingsFilters'

export const CatalogSettings = () => {
	const [searchParams] = useSearchParams()

	const filters = Object.fromEntries(searchParams)

	return (
		<div className='catalogSort'>
			{!!Object.keys(filters).length  && (
				<CatalogSettingsFilters filters={filters} />
			)}
		</div>
	)
}
