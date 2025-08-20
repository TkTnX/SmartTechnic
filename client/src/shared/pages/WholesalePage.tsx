import { ContactUs, Wholesale } from '@/widgets'

import { Breadcrumbs } from '@/shared/components'

export const WholesalePage = () => {
	return (
		<>
			<Breadcrumbs items={[{ title: 'Оптом' }]} />
			<Wholesale />
			<ContactUs />
		</>
	)
}
