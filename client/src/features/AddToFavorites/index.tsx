import { Heart } from 'lucide-react'

import './_addToFavorites.scss'

type Props = {
	productId: string
}

export const AddToFavorites = ({ productId }: Props) => {
	return (
		<button className='addToFavorites'>
			<Heart size={24} />
		</button>
	)
}
