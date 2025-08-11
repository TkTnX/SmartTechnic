import { useState } from 'react'
import './_filtersSheet.scss'
import { Sheet } from '@/shared/components/ui'
import { CatalogFilters } from '@/widgets/Catalog/components/CatalogFilters'

export const FiltersSheet = () => {
    const [open, setOpen] = useState(false)
	return (
		<>
			<button onClick={() => setOpen(!open)} className='catalogSort__filtersBtn'>
				<img src='/images/icons/filter.svg' alt='Filter' />
				Фильтры
            </button>
            <Sheet className='filtersSheet' open={open} setOpen={setOpen} title='Фильтры' icon='/images/icons/filter.svg'>
                <CatalogFilters />
            </Sheet>
		</>
	)
}
