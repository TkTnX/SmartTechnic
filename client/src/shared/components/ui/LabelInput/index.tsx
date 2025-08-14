import './_labelInput.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
}

export const LabelInput = ({
	label,
	name,
	type = 'text',
	className
}: Props) => {
	return (
		<label className={`labelInput ${className}`}>
			{label}
			<input type={type} name={name} className='labelInput__input' />
		</label>
	)
}
