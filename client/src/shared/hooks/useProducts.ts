import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';



import { productsService } from '@/shared/services';





const MIN = 0
const MAX = 100000

export function useProducts(query?: Record<string, string>) {
	const [searchParams] = useSearchParams()
	const [minMaxPrice, setMinMaxPrice] = useState<number[]>([MIN, MAX])

	const filters = Object.fromEntries(searchParams)

	const {
		data: products,
		isPending,
		error
	} = useQuery({
		queryKey: ['products', filters],
		queryFn: () => productsService.getProducts(query ? query :filters)
	})

	useEffect(() => {
		if (products && products.length > 0) {
			const prices = products.map(p => p.price)
			const minPrice = Math.min(...prices)
			const maxPrice = Math.max(...prices)
			setMinMaxPrice([minPrice, maxPrice])
		}
	}, [products])

	return {
		products,
		isPending,
		error,
        minMaxPrice,
        setMinMaxPrice
	}
}