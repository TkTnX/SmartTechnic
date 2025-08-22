import { LogoutButton } from '@/features'
import { Link, useLocation } from 'react-router-dom'

import { USER_NAV } from '@/shared/constants'
import { useUserStore } from '@/shared/stores'

import './_userNav.scss'

type Props = {
	className?: string
	onClick?: () => void
}

export const UserNav = ({ className, onClick }: Props) => {
	const { pathname } = useLocation()
	const user = useUserStore(state => state.user)
	return (
		<div className={`userNav ${className}`}>
			{user?.role === 'ADMIN' && (
				<Link
					onClick={onClick}
					className={`userNav__link ${pathname === "/dashboard" ? 'active' : ''}`}
					to={"/dashboard"}
				>
					Панель управления
				</Link>
			)}
			{USER_NAV.map(item => (
				<Link
					onClick={onClick}
					className={`userNav__link ${pathname === item.href ? 'active' : ''}`}
					key={item.href}
					to={item.href}
				>
					{item.title}
				</Link>
			))}
			<LogoutButton />
		</div>
	)
}
