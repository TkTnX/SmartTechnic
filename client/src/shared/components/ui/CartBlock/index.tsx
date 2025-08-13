import './_cartBlock.scss'

type Props = {
	title: string
	setStep: (value: number) => void
	step: number
	blockStep: number
	children: React.ReactNode
	className?: string
}

export const CartBlock = ({
	title,
	setStep,
	step,
	blockStep,
	children,
	className
}: Props) => {
	return (
		<>
			<div className='cartBlock'>
				<h4 className='cartBlock__title'>{title}</h4>
				<div className={`cartBlock__content ${className}`}>
					{children}{' '}
					{step !== blockStep && (
						<button
							onClick={() => setStep(step)}
							className='cartBlock__changeBtn'
						>
							Изменить
						</button>
					)}
				</div>
			</div>
			<button
				className='cartBlock__nextBtn'
				onClick={() => setStep(step + 1)}
			>
				Далее
			</button>
		</>
	)
}
