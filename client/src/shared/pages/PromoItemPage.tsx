import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { Breadcrumbs, Skeleton } from '@/shared/components'
import { promoService } from '@/shared/services'
import { BigPromo } from '@/widgets'

export const PromoItemPage = () => {
	const { promoId } = useParams()
	const {
		data: promo,
		isPending,
		error
	} = useQuery({
		queryKey: ['promo', promoId],
		queryFn: () => promoService.getPromo(promoId!)
	})

	console.log(promo)

	if (error) return <p className='error'>{error.message}</p>
	return (
		<>
			<Breadcrumbs
				items={[
					{ title: 'Акции', href: '/promos' },
					{ title: promo?.title || 'Загрузка...' }
				]}
      />
      {isPending ? <Skeleton height={521} /> : <BigPromo promo={promo} />}
		</>
	)
}
