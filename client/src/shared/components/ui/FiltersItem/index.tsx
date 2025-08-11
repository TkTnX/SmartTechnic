import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import type { SpecificationValue } from '@/shared/types'

import './_filtersItem.scss'

type Props = {
	title: string
	items?: SpecificationValue[]
	children?: React.ReactNode
}
export const FiltersItem = ({ title, items, children }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [open, setOpen] = useState(true)

	const onChange = (value: string) => {
		const params = new URLSearchParams(searchParams)

		// Получение текущих значений
		const currentValues = params.get(title)?.split(',') || []

		// Если значение уже есть в массиве - удаляем, иначе добавляем
		if (currentValues.includes(value)) {
			const newValues = currentValues.filter(v => v !== value)

			// Если массив пустой - удаляем ключ
			if (newValues.length) {
				params.set(title, newValues.join(','))
			} else {
				params.delete(title)
			}
		} else {
			params.set(title, [...currentValues, value].join(','))
		}
		setSearchParams(params)
	}

	return (
		<div className={`filtersItem ${open ? 'open' : ''}`}>
			<button
				onClick={() => setOpen(!open)}
				className='filtersItem__trigger'
			>
				{title}
				<img
					className='filtersItem__trigger-arrow'
					src='/images/icons/chevron-right.svg'
					alt='Arrow'
				/>
			</button>
			<div className='filtersItem__content'>
				{children
					? children
					: items!.map((item, index) => (
							<label className='filtersItem__label' key={index}>
								<input
									value={item.value}
									onChange={e => onChange(e.target.value)}
									className='filtersItem__input'
									type='checkbox'
									name={title}
								/>
								<span className='filtersItem__text'>
									{item.value}
								</span>
								<span className='filtersItem__quantity'>
									({item.quantity})
								</span>
							</label>
						))}
			</div>
		</div>
	)
}
