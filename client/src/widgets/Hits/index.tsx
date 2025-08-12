import { ProductsSection } from '@/shared/components'

export const Hits = () => {
	return (
		<ProductsSection
			title='Хиты продаж'
			link='/catalog'
			query={{ take: '4', sortBy: 'sales-desc' }}
		/>
	)
}
