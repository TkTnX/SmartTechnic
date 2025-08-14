import { useMutation } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'

import { cartService } from '@/shared/services'

import './_removeFromCart.scss'
import { toast } from 'react-toastify'
import { useUserStore } from '@/shared/stores'
import type { AxiosError } from 'axios'

type Props = {
	cartProductId: string
}

export const RemoveFromCart = ({ cartProductId }: Props) => {
	const fetchUser = useUserStore(store => store.fetchUser)
	const { mutate, isPending } = useMutation({
		mutationFn: () => cartService.removeFromCart(cartProductId),
		onSuccess: data => {
			toast.success(data.message)
			fetchUser()
		},
		onError: (err: AxiosError<{ message: string }>) =>
			toast.error(err?.response?.data?.message)
	})

	return (
		<button className='removeFromCart' onClick={() => mutate()} disabled={isPending}>
			<Trash2 color='#838688' />
		</button>
	)
}
