import './_dropdownInput.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	items: { value: string; label: string }[]
}

export const DropdownInput = ({ label, name, items, className, defaultValue }: Props) => {
	return (
		<label className={`dropdownInput ${className}`}>
			{label}
			<select defaultValue={defaultValue} name={name} className='dropdownInput__input'>
				{items.map(item => (
					<option  value={item.value} key={item.value}>
						{item.label}
					</option>
				))}
			</select>
		</label>
	)
}
