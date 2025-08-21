import { Link } from 'react-router-dom'

import type { INews } from '@/shared/types'

import './_newsItem.scss'

type Props = {
	news: INews
	isNewsPage: boolean
}

export const News = ({ news, isNewsPage }: Props) => {
	return (
		<Link to={`/news/${news.id}`} className={`newsItem ${isNewsPage && 'newsItem--newsPage'}`}>
			{isNewsPage && (
				<img
					className='newsItem__img'
					src={news.image}
					alt={news.title}
				/>
			)}
			<div className='newsItem__content'>
				<h6 className='newsItem__title'>{news.title}</h6>
				{/* TODO: В будущем разделять до точки */}
				<p className='newsItem__text'>{news.text.slice(0, 100)}</p>
				<div className={`newsItem__bottom ${isNewsPage && 'newsItem__bottom--newsPage'}`}>
					<Link className='newsItem__link' to={`/news/${news.id}`}>
						Подробнее
						<img src='/images/icons/right.svg' alt='Подробнее' />
					</Link>
					<p className='newsItem__date'>
						{new Date(news.createdAt).toLocaleDateString('ru-RU', {
							day: '2-digit',
							month: 'long',
							year: 'numeric'
						})}
					</p>
				</div>
			</div>
		</Link>
	)
}
