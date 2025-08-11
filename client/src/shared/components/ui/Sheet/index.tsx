import './_sheet.scss'

type Props = {
	title: string
	icon?: string
	open: boolean
	setOpen: (value: boolean) => void
	className?: string
	children: React.ReactNode
}

export const Sheet = ({
	title,
	icon,
	open,
	setOpen,
	className,
	children
}: Props) => {
	document.body.style.overflow = open ? 'hidden' : 'unset'

	return (
		<div className={`sheet ${open ? 'open' : ''} ${className}`}>
			<div className='sheet__top'>
				<div className='sheet__title'>
					{icon && <img src={icon} alt={title} />}
					<h6>{title}</h6>
				</div>
				<button onClick={() => setOpen(false)}>
					<img src='/images/icons/x.svg' alt='Close' />
				</button>
			</div>
			<div className='sheet__content'>{children}</div>
		</div>
	)
}
