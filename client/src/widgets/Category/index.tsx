import { ProductsSection } from '@/shared/components'

export const Category = () => {
	return (
		<ProductsSection
			title='Сигвеи'
			link='/catalog?category=1'
			query={{ take: '4', category: '1' }}
		/>
	)
}
