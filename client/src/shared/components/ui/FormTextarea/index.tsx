import './_formTextarea.scss'

type Props = {
	label: string
	name: string
	className?: string
}
export const FormTextarea = ({ label, name, className }: Props) => {
	return (
		<label className={`formTextarea ${className}`}>
			<p className='formTextarea__label'>{label}</p>
			<textarea name={name} className={` formTextarea__input`} />
		</label>
	)
}
