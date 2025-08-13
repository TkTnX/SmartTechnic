import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { Heart } from 'lucide-react'
import { toast } from 'react-toastify'

import { favoritesService } from '@/shared/services'
import { useUserStore } from '@/shared/stores'

import './_addToFavorites.scss'

type Props = {
	productId: string
	isFav?: boolean
}

export const AddToFavorites = ({ productId, isFav }: Props) => {
	const fetchUser = useUserStore(state => state.fetchUser)
	const { mutate, isPending } = useMutation({
		mutationFn: () => favoritesService.addToFavorites(productId),
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
			className={`addToFavorites ${isFav ? 'active' : ''}`}
		>
			<Heart size={24} />
		</button>
	)
}
