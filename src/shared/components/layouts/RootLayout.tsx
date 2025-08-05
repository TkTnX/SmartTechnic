import { BottomMenu } from '@/features'
import { Outlet } from 'react-router-dom'

import { Header, Navbar } from '@/shared/components'

export const RootLayout = () => {
	return (
		<>
			<Header />
			<Navbar />
			<main className='container'>
				<Outlet />
			</main>
			<BottomMenu />
		</>
	)
}
