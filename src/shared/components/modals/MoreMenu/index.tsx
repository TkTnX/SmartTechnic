'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'

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
			{open && (
				<>
					<div className='moreMenu'>
						<div className='moreMenu__top'>
							<h4 className='moreMenu__title'>Ещё</h4>
							<button onClick={() => setOpen(false)}>
								<img src='/images/icons/x.svg' alt='Закрыть' />
							</button>
						</div>
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
					</div>
					<div className='moreMenu__overlay' />
				</>
			)}
		</>
	)
}
