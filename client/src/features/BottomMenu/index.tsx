import { CatalogList, Search } from '@/features'
import { Link } from 'react-router-dom'

import './_bottomMenu.scss'
import CartIcon from './images/cart.svg?react'
import HomeIcon from './images/home.svg?react'
import { MoreMenu } from '@/shared/components'

export const BottomMenu = () => {
	return (
		<div className='bottomMenu'>
			<Link className='bottomMenu__link' to={'/'}>
				<HomeIcon />
				Главная
			</Link>
			<CatalogList />
			<Link className='bottomMenu__link' to={'/cart'}>
				<CartIcon />
				Корзина
			</Link>
			<Search />
			<MoreMenu />
		</div>
	)
}
