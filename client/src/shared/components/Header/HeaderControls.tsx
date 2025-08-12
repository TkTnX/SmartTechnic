import { AuthForm } from '@/features'
import { Link } from 'react-router-dom'

import { UserDropdown } from '@/shared/components'
import { useUserStore } from '@/shared/stores'

export const HeaderControls = () => {
	const user = useUserStore(state => state.user)
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
			{!user ? <AuthForm /> : <UserDropdown />}
		</div>
	)
}
