import { Compare } from '@/widgets'

import { Breadcrumbs } from '@/shared/components'

export const ComparePage = () => {
	return (
		<>
			<Breadcrumbs items={[{ title: 'Сравнение товаров' }]} />
			<Compare />
		</>
	)
}
