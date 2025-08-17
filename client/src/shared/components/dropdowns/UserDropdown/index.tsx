import { UserCircle2 } from 'lucide-react'
import { useState } from 'react'

import { UserNav } from '../../UserNav'

import './_userDropdown.scss'

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
			{open && <UserNav onClick={() => setOpen(false)} className='userDropdown' />}
		</>
	)
}
