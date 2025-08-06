import { Link } from 'react-router-dom'

import type { INews } from '@/shared/types'

import './_newsItem.scss'

type Props = {
	news: INews
}

export const News = ({ news }: Props) => {
	return (
		<Link to={`/news/${news.id}`} className='newsItem'>
			<h6 className='newsItem__title'>{news.title}</h6>
			{/* TODO: В будущем разделять до точки */}
			<p className='newsItem__text'>{news.text.slice(0, 100)}</p>
			<div className='newsItem__bottom'>
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
		</Link>
	)
}
