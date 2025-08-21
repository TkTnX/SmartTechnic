import { AuthForm } from '@/features'
import { Heart } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { Badge, UserDropdown } from '@/shared/components'
import { useUserStore } from '@/shared/stores'

export const HeaderControls = () => {
	const { pathname } = useLocation()
	const user = useUserStore(state => state.user)
	return (
		<div className='header__controls'>
			<Link
				className={`header__controls-link ${pathname.includes('favorites') ? 'active-favorites' : ''}`}
				to={'/profile/favorites'}
			>
				<Heart color='#838688' />
				<Badge quantity={user?.favoriteProducts.length || null} />
			</Link>
			<Link className='header__controls-link' to={'/compare'}>
				<img src='/images/icons/graph.svg' alt='сравнение' />
				<Badge quantity={user?.compareItems.length || null} />
			</Link>
			<Link className='header__controls-link' to={'/cart'}>
				<img src='/images/icons/cart.svg' alt='Корзина' />
				<Badge quantity={user?.cartProducts.length || null} />
			</Link>
			{!user ? <AuthForm /> : <UserDropdown />}
		</div>
	)
}
