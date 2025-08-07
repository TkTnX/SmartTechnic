'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Modal } from '@/shared/components/ui'
import { NAVBAR_LINKS } from '@/shared/constants/navbar.constants'

import './_moreMenu.scss'
import MoreIcon from './images/more.svg?react'

export const MoreMenu = () => {
	const [open, setOpen] = useState(false)

	return (
		<>
			<button onClick={() => setOpen(true)} className='bottomMenu__link'>
				<MoreIcon />
				Ещё
			</button>
			<Modal
				title='Ещё'
				open={open}
				setOpen={setOpen}
				className='moreMenu'
			>
				<nav className='moreMenu__links'>
					{NAVBAR_LINKS.map(link => (
						<Link
							key={link.href}
							to={link.href}
							className='moreMenu__link'
						>
							{link.name}
						</Link>
					))}
				</nav>
			</Modal>
		</>
	)
}
