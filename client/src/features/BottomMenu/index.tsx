import { Search, CatalogCategoriesList } from '@/features'
import { Link } from 'react-router-dom';



import { MoreMenu } from '@/shared/components';



import './_bottomMenu.scss';
import CartIcon from './images/cart.svg?react';
import HomeIcon from './images/home.svg?react';





export const BottomMenu = () => {
	return (
		<div className='bottomMenu'>
			<Link className='bottomMenu__link' to={'/'}>
				<HomeIcon />
				Главная
			</Link>
			<CatalogCategoriesList />
			<Link className='bottomMenu__link' to={'/cart'}>
				<CartIcon />
				Корзина
			</Link>
			<Search />
			<MoreMenu />
		</div>
	)
}