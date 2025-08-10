'use client'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { CATALOG_LINKS } from '@/shared/constants'

import './_catalogCategoriesList.scss'
import MenuIcon from './images/menu.svg?react'

export const CatalogCategoriesList = () => {
	const [open, setOpen] = useState(() => window.innerWidth >= 768)
	document.body.style.overflow = open ? 'hidden' : 'unset'

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setOpen(true)
			} else {
				setOpen(false)
			}
		}

		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	})

	return (
		<>
			{/* TODO: На главной кнопка должна быть ссылкой, на других страницах меню закрыто */}
			<div className='catalogCategoriesList__wrapper'>
				<button
					onClick={() => setOpen(!open)}
					className='catalogCategoriesList__wrapper-button'
				>
					<MenuIcon />
					Каталог <span>товаров</span>
				</button>

				{open && (
					<div className='catalogCategoriesList'>
						<div className='catalogCategoriesList__top'>
							<h4 className='catalogCategoriesList__title'>Каталог</h4>
							<button onClick={() => setOpen(false)}>
								<img src='/images/icons/x.svg' alt='Close' />
							</button>
						</div>
						<nav>
							<ul className='catalogCategoriesList__list'>
								{CATALOG_LINKS.map(link => (
									<li key={link.href}>
										<Link
											className='catalogCategoriesList__link'
											to={link.href}
										>
											<img src={link.icon} />
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</div>
				)}
			</div>
			{open && <div className='catalogCategoriesList__overlay' />}
		</>
	)
}
