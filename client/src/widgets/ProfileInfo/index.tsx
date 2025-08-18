import { Link } from 'react-router-dom'

import { Skeleton } from '@/shared/components'
import { useUserStore } from '@/shared/stores'

import './_profileInfo.scss'

export const ProfileInfo = () => {
	const { user, isLoading } = useUserStore()

	if (isLoading)
		return <Skeleton className='profileInfo__skeleton' height={336} />

	return (
		<section className='profileInfo'>
			<h4 className='profileInfo__title'>{user?.name}</h4>
			<div className='profileInfo__top'>
				{user?.avatar ? (
					<img
						className='profileInfo__avatar'
						src={user.avatar}
						alt={user.name}
					/>
				) : (
					<div className='profileInfo__avatar'>{user?.name[0]}</div>
				)}
				<div className='profileInfo__info'>
					<p className='profileInfo__item'>
						Дата регистрации:{' '}
						{user && new Date(user.createdAt).toLocaleDateString('ru-RU', {
							day: '2-digit',
							month: '2-digit',
							year: 'numeric'
						})}
					</p>
					<p className='profileInfo__item'>
						Заказов: {user?.orders.length}
					</p>
				</div>
			</div>
			<p className='profileInfo__text'>
				Добро пожаловать в панель управления. Здесь вы можете
				<Link to={'/profile/personal'}>
					изменить свои регистрационные данные
				</Link>{' '}
				и <Link to={'/profile/personal'}>cменить пароль.</Link>
				Зарегистрированные пользователи имеют доступ к{' '}
				<Link to={'/profile/history'}>истории заказов</Link> и
				возможность{' '}
				<Link to={'/profile/favorites'}>
					добавлять в избранное товары для будущих покупок.
				</Link>
			</p>
			<Link className='profileInfo__link' to={'/profile/personal'}>
				Панель управления
			</Link>
		</section>
	)
}
