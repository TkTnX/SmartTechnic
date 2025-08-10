import { useState } from 'react'

import './_filtersItem.scss'

type Props = {
	title: string
	items?: Record<string, string>[]
	children?: React.ReactNode
}
export const FiltersItem = ({ title, items, children }: Props) => {
	const [open, setOpen] = useState(true)
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
			<div className="filtersItem__content">
				{children
					? children
					: items!.map((item, index) => (
							<label className='filtersItem__label' key={index}>
								<input
									className='filtersItem__input'
									type='checkbox'
									name={item.value}
								/>
								<span className='filtersItem__text'>
									{item.title}
								</span>
							</label>
						))}
			</div>
		</div>
	)
}
