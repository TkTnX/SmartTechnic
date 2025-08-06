import { News as NewsItem } from '@/entities'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { Skeleton } from '@/shared/components'
import { newsService } from '@/shared/services'

import './_news.scss'

export const News = () => {
	const {
		data: news,
		error,
		isLoading
	} = useQuery({
		queryKey: ['News'],
		queryFn: async () => await newsService.getNews({ take: '2' })
	})

	return (
		<section className='news'>
			<div className='news__top'>
				<h2 className='news__title'>Новости</h2>
				<Link className='news__link' to={'/news'}>
					Читать все{' '}
					<img src='/images/icons/right.svg' alt='Все новости' />{' '}
				</Link>
			</div>
			{error ? (
				<p className='error'>{error.message}</p>
			) : (
				<div className='news__items'>
					{isLoading
						? [...new Array(2)].map((_, index) => (
								<Skeleton key={index} height={210} />
							))
						: news!.map(news => (
								<NewsItem key={news.id} news={news} />
							))}
				</div>
			)}
		</section>
	)
}
