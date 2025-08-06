import { AddToCompare, AddToFavorites } from '@/features'

type Props = {
	productId: string
}

export const ProductControls = ({ productId }: Props) => {
	return (
		<div className='product__controls'>
			<AddToFavorites productId={productId} />
			<AddToCompare productId={productId} />
		</div>
	)
}
