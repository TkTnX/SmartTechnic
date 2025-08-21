import { News as NewsItem } from '@/entities'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { Skeleton } from '@/shared/components/ui'
import { newsService } from '@/shared/services'

import './_news.scss'

type Props = {
	isNewsPage?: boolean
}

export const News = ({ isNewsPage = false }: Props) => {
	const {
		data: news,
		error,
		isLoading
	} = useQuery({
		queryKey: ['News'],
		queryFn: async () =>
			await newsService.getNews({ take: isNewsPage ? '' : '2' })
	})

	return (
		<section className='news'>
			{!isNewsPage ? (
				<div className='news__top'>
					<h2 className='news__title'>Новости</h2>
					<Link className='news__link' to={'/news'}>
						Читать все{' '}
						<img
							src='/images/icons/right.svg'
							alt='Все новости'
						/>{' '}
					</Link>
				</div>
			) : <h1 className='news__title'>Новости</h1>}
			{error ? (
				<p className='error'>{error.message}</p>
			) : (
				<div className={`news__items ${isNewsPage && 'news__items--newsPage'}`}>
					{isLoading
						? [...new Array(2)].map((_, index) => (
								<Skeleton key={index} height={210} />
							))
						: news!.map(news => (
								<NewsItem key={news.id} isNewsPage={isNewsPage} news={news} />
							))}
				</div>
			)}
		</section>
	)
}
