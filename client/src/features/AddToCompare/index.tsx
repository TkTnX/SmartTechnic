import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { compareService } from '@/shared/services'
import { useUserStore } from '@/shared/stores'

import './_addToCompare.scss'
import CompareIcon from './images/graph.svg?react'

type Props = {
	productId: string
}

export const AddToCompare = ({ productId }: Props) => {
	const { fetchUser, user } = useUserStore()
	const [isAdded, setIsAdded] = useState(
		!!user?.compareItems.find(item => item.productId === productId)
	)

	useEffect(() => {
		setIsAdded(
			!!user?.compareItems.find(item => item.productId === productId)
		)
	}, [productId, user, user?.compareItems.length])

	const { mutate, isPending } = useMutation({
		mutationFn: () => compareService.addToCompare(productId),
		onSuccess: data => {
			toast.success(data.message)
			fetchUser()
		},
		onError: (err: AxiosError<{ message: string }>) =>
			toast.error(err?.response?.data?.message)
	})
	return (
		<button
			disabled={isPending}
			onClick={() => mutate()}
			className={`addToCompare ${isAdded ? 'added' : ''}`}
		>
			<CompareIcon />
		</button>
	)
}
