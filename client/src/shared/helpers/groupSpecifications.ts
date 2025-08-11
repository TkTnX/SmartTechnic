import type { IGroupedSpecifications, ISpecification } from '@/shared/types'

export function groupSpecifications(arr: ISpecification[]) {
	if (!arr.length) return []
	const grouped = arr.reduce((acc: IGroupedSpecifications[], item) => {
		const existing = acc.find(obj => obj.title === item.title)

		if (existing) {
			const isValueExist = existing.values.find(
				value => value.value === item.value
			)

			if (!isValueExist) {
				existing.values.push({
					value: item.value!,
					productId: item.productId,
					quantity: 1
				})
			} else {
				existing.values.find(value => value.value === item.value)!
					.quantity++
			}
		} else {
			acc.push({
				title: item.title,
				categoryId: item.categoryId,
				category: item.category!,
				values: [
					{
						value: item.value!,
						productId: item.productId,
						quantity: 1
					}
				]
			})
		}

		return acc
	}, [])

	return grouped
}
