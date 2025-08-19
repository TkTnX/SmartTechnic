import { About } from '@/widgets'

import { Breadcrumbs } from '@/shared/components'

export const AboutUsPage = () => {
	return (
		<>
			<Breadcrumbs items={[{ title: 'О нас' }]} />
			<About />
		</>
	)
}
