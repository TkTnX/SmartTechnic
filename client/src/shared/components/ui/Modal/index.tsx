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
	console.log(open)
	useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : 'unset'
	}, [open])
	if (!open) return null
	return (
		<>
			<div className={` ${className} modal`}>
				<div className='modal__top'>
					<h4 className='modal__title'>{title}</h4>
					<button onClick={() => setOpen(false)}>
						<img src='/images/icons/x.svg' alt='Закрыть' />
					</button>
				</div>
				{children}
			</div>
			<div className='modal__overlay' />
		</>
	)
}
