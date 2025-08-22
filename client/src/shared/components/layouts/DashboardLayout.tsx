import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import {
	Breadcrumbs,
	DashboardNav,
	Header,
	MoveToUp
} from '@/shared/components'
import { useUserStore } from '@/shared/stores'

import './_layouts.scss'

export const DashboardLayout = () => {
	const fetchUser = useUserStore(state => state.fetchUser)

	useEffect(() => {
		fetchUser()
	}, [])

	return (
		<>
			<MoveToUp />
			<Header />
			<main className='container'>
				<Breadcrumbs items={[{ title: 'Панель управления' }]} />
				<h1 className='layout__title'>Панель управления</h1>
				<div className='layout__wrapper'>
					<DashboardNav />
					<Outlet />
				</div>
			</main>
		</>
	)
}
