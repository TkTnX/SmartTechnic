import './_button.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
	text?: string
	children?: React.ReactNode
	variant?: 'filled' | 'outlined'
}

export const Button = ({
	text,
	className,
	children,
	variant,
	...props
}: Props) => {
	return (
		<button
			className={`${className} button ${variant === 'outlined' ? 'outlined' : ''} `}
			{...props}
		>
			{children || text}
		</button>
	)
}
