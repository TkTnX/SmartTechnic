import { useSearchParams } from 'react-router-dom'

import { useSpecifications } from '@/shared/hooks'

type Props = {
	filters: { [k: string]: string }
}

export const CatalogSettingsFilters = ({ filters }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const { groupedSpecifications } = useSpecifications(filters.category)

	const onDelete = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams)
		params.delete(key, value)
		setSearchParams(params)
	}

	const onClear = () => setSearchParams({})

	return (
		<div className='catalogSort__filters'>
			{Object.entries(filters).map(([key, value]) => (
				<div className='catalogSort__item' key={key}>
					<p className='catalogSort__value'>
						{key === 'category' ? 'Категория' : key}:{' '}
						{key === 'category'
							? groupedSpecifications[0]?.category?.name || value
							: value}
					</p>
					<button
						onClick={() => onDelete(key, value)}
						className='catalogSort__delete'
					>
						<img src='/images/icons/x.svg' alt='Close' />
					</button>
				</div>
			))}
			<button onClick={onClear} className='catalogSort__clear'>
				Очистить фильтры
			</button>
		</div>
	)
}
