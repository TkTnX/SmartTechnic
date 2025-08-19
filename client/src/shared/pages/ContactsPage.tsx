import { ContactUs, Contacts } from '@/widgets'

import { Breadcrumbs } from '@/shared/components'

export const ContactsPage = () => {
	return (
		<>
			<Breadcrumbs items={[{ title: 'Контакты' }]} />
			<Contacts />
			<ContactUs />
		</>
	)
}
