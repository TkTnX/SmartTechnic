import { Vacancies } from '@/widgets'

import { Breadcrumbs } from '@/shared/components'

export const VacanciesPage = () => {
	return (
		<>
			<Breadcrumbs items={[{ title: 'Вакансии' }]} />
			<Vacancies />
		</>
	)
}
