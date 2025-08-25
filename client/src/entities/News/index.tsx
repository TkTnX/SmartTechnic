import { DeleteEntity } from '@/features'
import { Link } from 'react-router-dom'

import { shrinkText } from '@/shared/helpers'
import { newsService } from '@/shared/services'
import type { INews } from '@/shared/types'

import './_newsItem.scss'

type Props = {
	news: INews
	isNewsPage: boolean
	className?: string
	isAdminPage?: boolean
}

export const News = ({ news, isNewsPage, className, isAdminPage }: Props) => {
	return (
		<div
			className={`newsItem ${isNewsPage && 'newsItem--newsPage'} ${className}`}
		>
			<Link to={`/news/${news.id}`} className='newsItem__full-link' />
			{isNewsPage && (
				<img
					className='newsItem__img'
					src={news.image}
					alt={news.title}
				/>
			)}
			<div className='newsItem__content'>
				<h6 className='newsItem__title'>{news.title}</h6>
				<p className='newsItem__text'>{shrinkText(news.text)}</p>
				<div
					className={`newsItem__bottom ${isNewsPage && 'newsItem__bottom--newsPage'}`}
				>
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
			{isAdminPage && <DeleteEntity service={newsService} id={news.id} />}
		</div>
	)
}
