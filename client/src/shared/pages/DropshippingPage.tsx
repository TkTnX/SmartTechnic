import { ContactUs, Dropshipping } from '@/widgets'

import { Breadcrumbs } from '@/shared/components'

export const DropshippingPage = () => {
	return (
		<>
			<Breadcrumbs items={[{ title: 'Оптом' }]} />
			<Dropshipping />
			<ContactUs />
		</>
	)
}
