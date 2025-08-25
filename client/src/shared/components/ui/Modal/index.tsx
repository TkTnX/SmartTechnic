import { useEffect } from 'react'

import './_modal.scss'

type Props = {
	children: React.ReactNode
	title: string
	open: boolean
	setOpen: (value: boolean) => void
	className?: string
}
export const Modal = ({ children, title, open, setOpen, className }: Props) => {
	useEffect(() => {
		if (!open) return
		document.body.style.overflow = open ? 'hidden' : 'unset'
	}, [open])

	const onClose = () => {
		setOpen(false)
		document.body.style.overflow = 'unset'
	}

	useEffect(() => {
		if (!open) return
		const close = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			}
		}

		document.addEventListener('keydown', close)

		return () => document.removeEventListener('keydown', close)
	}, [open])

	if (!open) return null

	return (
		<>
			<div className={` ${className} modal`}>
				<div className='modal__top'>
					<h4 className='modal__title'>{title}</h4>
					<button onClick={onClose}>
						<img src='/images/icons/x.svg' alt='Закрыть' />
					</button>
				</div>
				{children}
			</div>
			<div className='modal__overlay' />
		</>
	)
}
