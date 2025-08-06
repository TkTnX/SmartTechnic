import { ProductsSection } from '@/shared/components'

export const Category = () => {
	return (
		<ProductsSection
			title='Сигвеи'
			link='/catalog'
			query={{ take: '4', category: 'Сигвеи' }}
		/>
	)
}
