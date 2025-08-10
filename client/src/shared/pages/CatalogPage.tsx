import { Catalog } from '@/widgets'

import { Breadcrumbs } from '@/shared/components'

export const CatalogPage = () => {
	return (
		<>
			<Breadcrumbs items={[{ title: 'Каталог' }]} />
			<Catalog />
		</>
	)
}
