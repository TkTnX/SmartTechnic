import { DeletePromo } from '@/features'
import { Link } from 'react-router-dom'

import type { IPromo } from '@/shared/types'

import './_promo.scss'

type Props = {
	promo: IPromo
	isAdminPage?: boolean
}

export const Promo = ({ promo, isAdminPage }: Props) => {
	return (
		<div className='promo'>
			<Link to={`/promos/${promo.id}`} className='promo__link' />
			<h4 className='promo__title'>{promo.title}</h4>
			<img
				className='promo__image'
				src={promo.preview}
				alt={promo.title}
			/>
			{isAdminPage && <DeletePromo promoId={promo.id} />}
		</div>
	)
}
