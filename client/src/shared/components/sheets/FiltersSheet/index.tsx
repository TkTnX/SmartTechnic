import { CatalogFilters } from '@/widgets/Catalog/components/CatalogFilters'
import { useState } from 'react'

import { Button, Sheet } from '@/shared/components/ui'

import './_filtersSheet.scss'

export const FiltersSheet = () => {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button className='catalogSort__filtersBtn' onClick={() => setOpen(!open)}>
				<img src='/images/icons/filter.svg' alt='Filter' />
				Фильтры
			</Button>
			<Sheet
				className='filtersSheet'
				open={open}
				setOpen={setOpen}
				title='Фильтры'
				icon='/images/icons/filter.svg'
			>
				<CatalogFilters />
			</Sheet>
		</>
	)
}
