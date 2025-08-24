import type { ISpecification } from '@/shared/types';



import './_specification.scss';
import { DeleteSpecification } from '@/features';





type Props = {
	specification: ISpecification
	className?: string
	isAdminPage?: boolean
}

export const Specification = ({ specification, className, isAdminPage }: Props) => {
	return (
		<div className={`specification ${className}`}>
			<h6 className='specification__title'>{specification.title}:</h6>
			<p className='specification__value'>{specification.value}</p>
			{isAdminPage && <DeleteSpecification specificationId={specification.id} />}
		</div>
	)
}