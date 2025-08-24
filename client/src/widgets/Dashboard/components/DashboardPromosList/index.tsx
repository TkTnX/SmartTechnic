import {  Promo } from '@/entities'
import { useQuery } from '@tanstack/react-query'

import {  CreatePromo, Skeleton } from '@/shared/components'
import {  promoService } from '@/shared/services'

import './_dashboardPromosList.scss'

export const DashboardPromosList = () => {
	const { data, error, isPending } = useQuery({
		queryKey: ['promos'],
		queryFn: () => promoService.getPromos()
	})

	if (error) return <p className='error'>{error.message}</p>
	return (
		<section className='dashboardPromosList'>
			{isPending ? (
				[...new Array(6)].map((_, index) => (
					<Skeleton key={index} height={190} />
				))
			) : (
				<div className='dashboardPromosList__wrapper'>
					<CreatePromo />
					{data!.map(promo => (
						<Promo promo={promo} key={promo.id} />
					))}
				</div>
			)}
		</section>
	)
}
