import { useState } from 'react'

import type { IVacancy } from '@/shared/types'

import './_vacancy.scss'
import { VacancyCategory } from './components/VacancyCategory'

type Props = {
	vacancy: IVacancy
}

export const Vacancy = ({ vacancy }: Props) => {
	const [open, setOpen] = useState(false)
	return (
		<div className='vacancy'>
			<button
				onClick={() => setOpen(!open)}
				className={`vacancy__trigger ${open ? 'open' : ''}`}
			>
				<h6>{vacancy.title}</h6>
				<img src='/images/icons/chevron-right.svg' alt='Открыть' />
			</button>
			<div className={`vacancy__content ${open ? 'open' : ''}`}>
				{vacancy.weLookFor.length > 0 && (
					<VacancyCategory
						title='Мы ищем тех, кто:'
						items={vacancy.weLookFor}
					/>
				)}
				{vacancy.requirements.length > 0 && (
					<VacancyCategory
						title='Требования'
						items={vacancy.requirements}
					/>
				)}
				{vacancy.conditions.length > 0 && (
					<VacancyCategory
						title='Условия'
						items={vacancy.conditions}
					/>
				)}
			</div>
		</div>
	)
}
