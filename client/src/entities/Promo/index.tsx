import type { IPromo } from '@/shared/types'

import './_promo.scss'
import { Link } from 'react-router-dom'

type Props = {
	promo: IPromo
}

export const Promo = ({ promo }: Props) => {
	return (
		<Link to={`/promos/${promo.id}`} className='promo'>
			<h4 className='promo__title'>{promo.title}</h4>
			<img
				className='promo__image'
				src={promo.preview}
				alt={promo.title}
			/>
		</Link>
  )
}
