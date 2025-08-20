import { Vacancy } from '@/entities'
import { useQuery } from '@tanstack/react-query'

import { Skeleton } from '@/shared/components'
import { vacancyService } from '@/shared/services'

import './_vacanciesList.scss'

export const VacanciesList = () => {
	const { data, isPending, error } = useQuery({
		queryKey: ['vacancies'],
		queryFn: () => vacancyService.getVacancies()
	})

	if (error) return <p className='error'>{error.message}</p>

	return (
		<div className='vacanciesList'>
			{isPending
				? [...new Array(4)].map((_, index) => (
						<Skeleton height={48} key={index} />
					))
				: data?.map(vacancy => (
						<Vacancy key={vacancy.id} vacancy={vacancy} />
					))}
		</div>
	)
}
