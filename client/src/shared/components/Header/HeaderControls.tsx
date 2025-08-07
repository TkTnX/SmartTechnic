import { AuthForm } from '@/features'
import { Link } from 'react-router-dom'

export const HeaderControls = () => {
	return (
		<div className='header__controls'>
			<Link className='header__controls-link' to={'/favorites'}>
				<img src='/images/icons/heart.svg' alt='Избранное' />
			</Link>
			<Link className='header__controls-link' to={'/graph'}>
				<img src='/images/icons/graph.svg' alt='Аналитика' />
			</Link>
			<Link className='header__controls-link' to={'/cart'}>
				<img src='/images/icons/cart.svg' alt='Корзина' />
			</Link>
			<AuthForm />
		</div>
	)
}
