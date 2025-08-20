import './_vacancyCategory.scss'

type Props = {
	title: string
	items: string[]
}

export const VacancyCategory = ({ title, items }: Props) => {
	return (
		<div className='vacancyCategory'>
			<h4 className='vacancyCategory__title'>{title}</h4>
			<ul className='vacancyCategory__list'>
				{items.map((item, index) => (
					<li key={index} className='vacancyCategory__item'>
						{item}
					</li>
				))}
			</ul>
		</div>
	)
}
