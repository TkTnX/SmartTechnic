import {  DeleteEntity } from '@/features'
import { Link } from 'react-router-dom'

import type { ICategory } from '@/shared/types'

import './_category.scss'
import { categoriesService } from '@/shared/services'

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
			{isAdminPage && <DeleteEntity service={categoriesService} id={category.id} />}
		</div>
	)
}
