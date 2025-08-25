import { Button } from '@/shared/components/ui/Button'

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
				{step >= blockStep && (
					<div className={`cartBlock__content ${className}`}>
						{children}{' '}
						{step !== blockStep && step !== 1 && (
							<Button
								className='cartBlock__changeBtn'
								onClick={() => setStep(blockStep)}
								text='Изменить'
								variant='outlined'
							/>
						)}
					</div>
				)}
			</div>
			{step === blockStep && blockStep !== 4 && (
				<Button
					className='cartBlock__nextBtn'
					onClick={() => setStep(step + 1)}
					text='Далее'
				/>
			)}
		</>
	)
}
