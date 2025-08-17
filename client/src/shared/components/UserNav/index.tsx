import { LogoutButton } from '@/features'
import { Link, useLocation } from 'react-router-dom'

import { USER_NAV } from '@/shared/constants'

import './_userNav.scss'

type Props = {
	className?: string
	onClick?: () => void
}

export const UserNav = ({ className, onClick }: Props) => {
	const { pathname } = useLocation()
	return (
		<div className={`userNav ${className}`}>
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
