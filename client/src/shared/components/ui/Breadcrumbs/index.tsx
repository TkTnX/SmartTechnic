import { Link } from 'react-router-dom'

import './_breadcrumbs.scss'

type Props = {
	items: { title: string; href?: string }[]
}
export const Breadcrumbs = ({ items }: Props) => {
	return (
		<div className='breadcrumbs'>
			<div className='breadcrumbs__item'>
				<Link className='breadcrumbs__link' to={'/'}>
					Главная
				</Link>
			</div>
			{items.map((item, index) => (
				<div className='breadcrumbs__item'>
					<img src='/images/icons/chevron-right.svg' alt='right' />

					{item.href ? (
						<Link
							className='breadcrumbs__link'
							key={index}
							to={item.href}
						>
							{item.title}
						</Link>
					) : (
						<p className='breadcrumbs__last'>{item.title}</p>
					)}
				</div>
			))}
		</div>
	)
}
