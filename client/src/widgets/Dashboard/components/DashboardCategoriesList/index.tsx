import { Category } from '@/entities'
import { useQuery } from '@tanstack/react-query'

import { CreateCategory, Skeleton } from '@/shared/components'
import { categoriesService } from '@/shared/services'

import './_dashboardCategoriesList.scss'

export const DashboardCategoriesList = () => {
	const { data, error, isPending } = useQuery({
		queryKey: ['categories'],
		queryFn: () => categoriesService.getCategories()
	})

	if (error) return <p className='error'>{error.message}</p>
	return (
		<section className='dashboardCategoriesList'>
			{isPending ? (
				[...new Array(6)].map((_, index) => (
					<Skeleton key={index} height={596} />
				))
			) : (
				<>
					<CreateCategory />
					{data!.map(category => (
						<Category isAdminPage={true} className='dashboardCategoriesList__item' category={category} key={category.id} />
					))}
				</>
			)}
		</section>
	)
}
