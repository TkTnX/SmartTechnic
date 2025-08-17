import { BottomMenu } from '@/features'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import {
	Breadcrumbs,
	Footer,
	Header,
	MoveToUp,
	Navbar,
	UserNav
} from '@/shared/components'
import { USER_NAV } from '@/shared/constants'
import { useUserStore } from '@/shared/stores'

import './_layouts.scss'

export const ProfileLayout = () => {
	const { pathname } = useLocation()
	const fetchUser = useUserStore(state => state.fetchUser)
	const title =
		USER_NAV.find(item => item.href === pathname)?.title || 'Профиль'

	useEffect(() => {
		fetchUser()
	}, [])

	return (
		<>
			<MoveToUp />
			<Header />
			<Navbar />
			<main className='container'>
				<Breadcrumbs
					items={[
						{ title: 'Личный кабинет', href: '/profile' },
						{ title }
					]}
				/>
				<h1 className='layout__title'>{title}</h1>
				<div className='layout__wrapper'>
					<UserNav />
					<Outlet />
				</div>
			</main>
			<BottomMenu />
			<Footer />
		</>
	)
}
