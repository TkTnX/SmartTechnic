import { Link } from 'react-router-dom'

import './_notFound.scss'

export const NotFound = () => {
	return (
		<section className='notFound'>
			<h1 className='notFound__title'>404</h1>
			<p className='notFound__text'>Страница не найдена</p>
			<Link to={'/'} className='notFound__link'>
				Вернуться на главную
			</Link>
		</section>
	)
}
