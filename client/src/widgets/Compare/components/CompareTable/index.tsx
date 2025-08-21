import { useEffect, useState } from 'react'

import type { ICompareItem } from '@/shared/types'

import './_compareTable.scss'

type Props = {
	compareItems: ICompareItem[]
}

type CompareItem = {
	title: string
	values: (string | undefined)[]
}

export const CompareTable = ({ compareItems }: Props) => {
	const [specs, setSpecs] = useState<CompareItem[]>([])

	useEffect(() => {
		const allTitles = new Set<string>()

		compareItems.forEach(item => {
			item.product?.specifications.forEach(spec => {
				allTitles.add(spec.title)
			})
		})

		const specsMap = new Map<string, string[]>()

		allTitles.forEach(title => specsMap.set(title, []))

		compareItems.forEach(item => {
			const productsSpecs = item.product?.specifications ?? []

			allTitles.forEach(title => {
				const found = productsSpecs.find(spec => spec.title === title)

				if (found) {
					specsMap.get(title)!.push(found.value!)
				} else {
					specsMap.get(title)!.push('-')
				}
			})
		})

		const newSpecs = Array.from(specsMap, ([title, values]) => ({
			title,
			values
		}))

		setSpecs(newSpecs)
	}, [compareItems])

	return (
		<table className='compareTable'>
			<tbody>
				{specs.map(spec => (
					<tr key={spec.title}>
						<th>{spec.title}</th>
						{spec.values.map((value, index) => (
							<td key={index}>
								<span className='compareTable__count'>
									{index + 1})
								</span>{' '}
								{value}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}
