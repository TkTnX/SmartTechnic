import { type FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Modal } from '@/shared/components/ui'

import './_searchMenu.scss'

type Props = {
	setOpen: (value: boolean) => void
	open: boolean
}

export const SearchMenu = ({ setOpen, open }: Props) => {
	const [value, setValue] = useState('')
	const navigate = useNavigate()
	const inputRef = useRef<null | HTMLInputElement>(null)
	const onSubmit = (e: FormEvent) => {
		e.preventDefault()
		setOpen(false)
		navigate(`/catalog?search=${value}`)
	}

	useEffect(() => {
		if (open) {
			inputRef.current?.focus()
			console.log({ open })
		}
	}, [open])

	return (
		<Modal
			title='Поиск'
			open={open}
			setOpen={setOpen}
			className='searchMenu'
		>
			<form onSubmit={onSubmit} className='searchMenu__form'>
				<input
					ref={inputRef}
					value={value}
					onChange={e => setValue(e.target.value)}
					className='searchMenu__input'
					type='text'
					placeholder='Введите запрос, например «Smart balance»'
				/>
			</form>
		</Modal>
	)
}
