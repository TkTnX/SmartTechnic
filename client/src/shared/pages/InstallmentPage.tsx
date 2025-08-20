import { Breadcrumbs } from '@/shared/components'
import { Installment } from '@/widgets'

export const InstallmentPage = () => {
	return (
		<>
            <Breadcrumbs items={[{ title: 'Рассрочка 0|0|18' }]} />
            <Installment />
		</>
	)
}
