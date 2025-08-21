import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import type { INews } from '@/shared/types'

import './_bigNews.scss'

type Props = {
	news: INews
}

export const BigNews = ({ news }: Props) => {
	return (
		<section className='bigNews'>
			<h1 className='bigNews__title'>{news.title}</h1>
			<div className='bigNews__wrapper'>
				<div className='bigNews__content'>
					<Markdown remarkPlugins={[remarkGfm]}>{news.text}</Markdown>
				</div>
				<img className='bigNews__image' src={news.image} alt={news.title} />
			</div>
		</section>
	)
}
