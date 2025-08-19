import { InformationLetter, Service } from '@/widgets'

import { Breadcrumbs } from '@/shared/components'

export const ServicePage = () => {
	return (
		<>
			<Breadcrumbs items={[{ title: 'Сервис и гарантия' }]} />
			<Service />
			<InformationLetter />
		</>
	)
}
