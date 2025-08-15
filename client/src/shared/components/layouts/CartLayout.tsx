import { BottomMenu } from '@/features'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { Header, MoveToUp, Navbar, SmallFooter } from '@/shared/components'
import { useUserStore } from '@/shared/stores'

export const CartLayout = () => {
	const fetchUser = useUserStore(state => state.fetchUser)

	useEffect(() => {
		fetchUser()
	}, [])

	return (
		<>
			<MoveToUp />
			<Header />
			<Navbar />
			<main className='container'>
				<Outlet />
			</main>
			<BottomMenu />
			<SmallFooter />
		</>
	)
}
