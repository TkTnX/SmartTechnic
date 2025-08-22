import { LogoutButton } from '@/features'
import { Link, useLocation } from 'react-router-dom'

import { DASHBOARD_NAV } from '@/shared/constants'

import './_dashboardNav.scss'

type Props = {
	className?: string
	onClick?: () => void
}

export const DashboardNav = ({ className, onClick }: Props) => {
	const { pathname } = useLocation()
	return (
		<div className={`dashboardNav ${className}`}>
			{DASHBOARD_NAV.map(item => (
				<Link
					onClick={onClick}
					className={`dashboardNav__link ${pathname === item.href ? 'active' : ''}`}
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
