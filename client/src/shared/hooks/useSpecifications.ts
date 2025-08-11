import { useQuery } from '@tanstack/react-query'

import { groupSpecifications } from '@/shared/helpers'
import { specificationsService } from '@/shared/services'

export function useSpecifications(categoryId?: string | null) {
	const {
		data: specifications,
		isPending,
		error
	} = useQuery({
		queryKey: ['specifications', categoryId],
		queryFn: () =>
			specificationsService.getSpecificationsByCategory(categoryId!),
		enabled: !!categoryId
	})

	const groupedSpecifications = groupSpecifications(specifications || [])

	return {
		groupedSpecifications,
		isPending,
		error
	}
}
