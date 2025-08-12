import type { ISpecification } from '@/shared/types'

import './_specification.scss'

type Props = {
	specification: ISpecification
}

export const Specification = ({ specification }: Props) => {
	return (
		<div className='specification'>
			<h6 className='specification__title'>{specification.title}:</h6>
			<p className='specification__value'>{specification.value}</p>
		</div>
	)
}
