import { Specification } from '@/entities'

import type { ISpecification } from '@/shared/types'

import './_bigProductSpecifications.scss'

type Props = {
	specifications: ISpecification[]
}

export const BigProductSpecifications = ({ specifications }: Props) => {
	return (
		<div className='bigProductSpecifications'>
			{specifications.map(specification => (
				<Specification specification={specification} />
			))}
		</div>
	)
}
