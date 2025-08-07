'use client'

import { useState } from 'react'

import { SearchMenu } from '@/shared/components'

import './_search.scss'
import SearchIcon from './images/search.svg?react'

export const Search = () => {
	const [open, setOpen] = useState(false)
	document.body.style.overflow = open ? 'hidden' : 'unset'

	return (
		<>
			<button onClick={() => setOpen(true)} className='search'>
				<SearchIcon />
				<p className='search__placeholder'>Поиск</p>
			</button>
			{open && <SearchMenu open={open} setOpen={setOpen} />}
		</>
	)
}
