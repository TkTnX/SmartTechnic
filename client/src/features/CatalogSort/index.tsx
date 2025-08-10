import { useSearchParams } from 'react-router-dom'


import './_catalogSort.scss'

export const CatalogSort = () => {
	const [searchParams] = useSearchParams()

	const filters = Object.fromEntries(searchParams)
	console.log(filters)
	return <div className='catalogSort'></div>
}
