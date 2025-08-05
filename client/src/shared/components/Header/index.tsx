import { Search } from '@/features/Search'
import { Link } from 'react-router-dom'

import { HeaderControls } from './HeaderControls'
import './_header.scss'

export const Header = () => {
	return (
		<header className='container header'>
			<Link to={'/'}>
				<img src='/images/logo.svg' alt='Logo' />
			</Link>
			<div className='header__right'>
				<div className='header__socials'>
					<a href='tel:88126605054'>+7 (812) 660-50-54</a>
					<a href='tel:89581119503'>+7 (958) 111-95-03</a>
					<p className='header__socials-time'>
						Пн-вс: с 10:00 до 21:00
					</p>
				</div>
				<div className='header__controls'>
					<Search />
					<HeaderControls />
				</div>
			</div>
		</header>
	)
}
