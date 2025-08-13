import { Trash2 } from 'lucide-react'

import './_removeFromCart.scss'

type Props = {
	cartProductId: string
}

export const RemoveFromCart = ({ cartProductId }: Props) => {
	return (
		<button>
			<Trash2 color='#838688' />
		</button>
	)
}
