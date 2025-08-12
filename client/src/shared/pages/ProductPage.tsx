import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { Breadcrumbs } from '@/shared/components'
import { productsService } from '@/shared/services'
import { BigProduct } from '@/widgets'

export const ProductPage = () => {
	const { productId } = useParams()
	const {
		data: product,
		isPending,
		error
	} = useQuery({
		queryKey: ['product', productId],
		queryFn: () => productsService.getProduct(productId!)
    })
    
    if(error) return <p className='error'>{error.message}</p>

	return (
		<>
			<Breadcrumbs
				items={[
                    { title: 'Каталог', href: '/catalog' },
                    {title: product?.category.name || 'Загрузка...', href: `/catalog?category=${product?.categoryId}`},
					{ title: product?.name || 'Загрузка...' }
				]}
            />
            <BigProduct isPending={isPending} product={product!} />
		</>
	)
}
