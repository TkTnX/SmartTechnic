import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { cartService } from '@/shared/services'
import { useUserStore } from '@/shared/stores'

import './_changeQuantity.scss'

type Props = {
	quantity: number
	productQuantity: number
	cartProductId: string
}

export const ChangeQuantity = ({
	quantity,
	productQuantity,
	cartProductId
}: Props) => {
	const fetchUser = useUserStore(state => state.fetchUser)
	const { mutate, isPending } = useMutation({
		mutationFn: (value: 'minus' | 'plus') =>
			cartService.changeQuantity(cartProductId, value),
		onSuccess: data => {
			toast.success(data.message)
			fetchUser()
		},
		onError: (err: AxiosError<{ message: string }>) =>
			toast.error(err?.response?.data?.message)
	})


	return (
		<div className='changeQuantity'>
			<button
				onClick={() => mutate('minus')}
				className='changeQuantity__minus'
				disabled={quantity === 1 || isPending}
			>
				-
			</button>
			<p className='changeQuantity__quantity'>{quantity}</p>
			<button
				onClick={() => mutate('plus')}
				className='changeQuantity__plus'
				disabled={quantity === productQuantity || isPending}
			>
				+
			</button>
		</div>
	)
}
