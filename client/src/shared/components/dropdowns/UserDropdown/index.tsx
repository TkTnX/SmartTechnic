import { UserCircle2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { USER_NAV } from '@/shared/constants'

import './_userDropdown.scss'
import { LogoutButton } from '@/features'

export const UserDropdown = () => {
	const [open, setOpen] = useState(false)
	return (
		<>
			<button
				onClick={() => setOpen(!open)}
				className='header__controls-link userDropdown__button'
			>
				<UserCircle2 color='#838688' />{' '}
			</button>
			{open && (
				<div className='userDropdown'>
					{USER_NAV.map(item => (
						<Link
							className='userDropdown__link'
							key={item.href}
							to={item.href}
						>
							{item.title}
						</Link>
                    ))}
                    <LogoutButton />
				</div>
			)}
		</>
	)
}
