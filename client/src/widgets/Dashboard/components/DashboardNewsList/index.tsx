import { News } from '@/entities'
import { useQuery } from '@tanstack/react-query'

import { CreateNews, Skeleton } from '@/shared/components'
import { newsService } from '@/shared/services'

import './_dashboardNewsList.scss'

export const DashboardNewsList = () => {
	const { data, error, isPending } = useQuery({
		queryKey: ['news'],
		queryFn: () => newsService.getNews({})
	})

	if (error) return <p className='error'>{error.message}</p>
	return (
		<section className='dashboardNewsList'>
			{isPending ? (
				[...new Array(6)].map((_, index) => (
					<Skeleton key={index} height={190} />
				))
			) : (
				<div className='dashboardNewsList__wrapper'>
					<CreateNews />
					{data!.map(news => (
						<News className='dashboardNewsList__item' isNewsPage={true} news={news} key={news.id} />
					))}
				</div>
			)}
		</section>
	)
}
