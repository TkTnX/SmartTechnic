import { Link } from 'react-router-dom'

import { CATALOG_LINKS } from '@/shared/constants/catalogList.constants'

import './_catalogList.scss'

export const CatalogList = () => {
	return (
		<div className='catalogList__wrapper'>
			<button className='catalogList__wrapper-button'>
				<img src='/images/icons/menu.svg' alt='Каталог товаров' />
				Каталог товаров
			</button>

			<div className='catalogList'>
				<nav>
					<ul className='catalogList__list'>
						{CATALOG_LINKS.map(link => (
							<li key={link.href}>
								<Link
									className='catalogList__link'
									to={link.href}
								>
									<img src={link.icon} />
									{link.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</div>
	)
}
