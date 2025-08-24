import { DeleteCategory } from '@/features'
import { Link } from 'react-router-dom'

import type { ICategory } from '@/shared/types'

import './_category.scss'

type Props = {
	category: ICategory
	className?: string
	isAdminPage?: boolean
}

export const Category = ({
	category,
	isAdminPage = false,
	className
}: Props) => {
	return (
		<div className={`category ${className}`}>
			<Link
				className='category__link'
				to={`/catalog?category=${category.id}`}
			/>
			<p>{category.name}</p>
			{isAdminPage && <DeleteCategory categoryId={category.id} />}
		</div>
	)
}
