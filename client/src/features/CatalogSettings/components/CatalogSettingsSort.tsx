import { useSearchParams } from 'react-router-dom'

import { SORT_ITEMS } from '@/shared/constants'

export const CatalogSettingsSort = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const onChange = (value: string) => {
		const params = new URLSearchParams(searchParams)
		params.set('sortBy', value)
		setSearchParams(params)
	}

	return (
		<div className='catalogSort__sort'>
			<select
				value={searchParams.get('sortBy') || SORT_ITEMS[0].value}
				onChange={e => onChange(e.target.value)}
				className='catalogSort__select'
			>
				{SORT_ITEMS.map(item => (
					<option key={item.value} value={item.value}>
						{item.name}
					</option>
				))}
			</select>
		</div>
	)
}
