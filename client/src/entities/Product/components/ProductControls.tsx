import { AddToCompare, AddToFavorites } from '@/features'
import { useUserStore } from '@/shared/stores'
import { useEffect, useState } from 'react'

type Props = {
	productId: string
}

export const ProductControls = ({ productId }: Props) => {
	const user = useUserStore(state => state.user)
	const [isFav, setIsFav] = useState(!!user?.favoriteProducts.find(fav => fav.productId === productId))
	
	useEffect(() => {
		setIsFav(!!user?.favoriteProducts.find(fav => fav.productId === productId))
	}, [productId, user, user?.favoriteProducts.length])
	

	return (
		<div className='product__controls'>
			<AddToFavorites isFav={isFav} productId={productId} />
			<AddToCompare productId={productId} />
		</div>
	)
}
