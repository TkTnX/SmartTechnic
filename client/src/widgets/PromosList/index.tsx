import { Promo } from '@/entities'
import { useQuery } from '@tanstack/react-query'

import { Skeleton } from '@/shared/components'
import { promoService } from '@/shared/services'

import './_promosList.scss'

export const PromosList = () => {
	const { data, isPending, error } = useQuery({
		queryKey: ['promos'],
		queryFn: () => promoService.getPromos()
	})

	if (error) return <p className='error'>{error.message}</p>

	return (
		<section className='promosList'>
			<h1 className='promosList__title'>Акции</h1>
			<div className='promosList__list'>
				{isPending
					? [...new Array(4)].map((_, index) => (
							<Skeleton height={180} key={index} />
						))
					: data?.map(promo => (
							<Promo key={promo.id} promo={promo} />
						))}
			</div>
		</section>
	)
}
