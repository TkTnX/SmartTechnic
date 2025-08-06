import { ProductsSection } from '@/shared/components'

export const New = () => {
	return (
		<ProductsSection
			title='Новинки'
			link='/catalog'
			query={{ take: '4', sortBy: 'createdAt' }}
		/>
	)
}
