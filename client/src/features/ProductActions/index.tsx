
import { CreateProduct } from '@/shared/components'
import { productsService } from '@/shared/services'
import type { IProduct } from '@/shared/types'

import { DeleteEntity } from '../DeleteEntity'

import './_productActions.scss'

type Props = {
	product: IProduct
}

export const ProductActions = ({ product }: Props) => {
	return (
		<div className='productActions'>
			<CreateProduct product={product} />

			<DeleteEntity service={productsService} id={product.id} />
		</div>
	)
}
