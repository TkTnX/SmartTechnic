import { CatalogList } from '@/features/CatalogList'
import { Link } from 'react-router-dom'

import { NAVBAR_LINKS } from '@/shared/constants/navbar.constants'

import './_navbar.scss'

export const Navbar = () => {
	return (
		<div className='navbar'>
			<div className='container navbar__wrapper'>
				<CatalogList />

				<nav className='navbar__links'>
					{NAVBAR_LINKS.map(link => (
						<Link
							key={link.href}
							to={link.href}
							className='navbar__link'
						>
							{link.name}
						</Link>
					))}
				</nav>
			</div>
		</div>
	)
}
