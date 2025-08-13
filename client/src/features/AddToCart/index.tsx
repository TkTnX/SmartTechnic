import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { cartService } from '@/shared/services'
import { useUserStore } from '@/shared/stores'

import './_addToCart.scss'
import CartIcon from './images/cart.svg?react'

type Props = {
	productId: string
	isBig?: boolean
}

// TODO: Проверять, если quantity в корзине НЕ больше quantity в продукте

export const AddToCart = ({ productId, isBig }: Props) => {
	const fetchUser = useUserStore(state => state.fetchUser)
	const { mutate, isPending } = useMutation({
		mutationFn: () => cartService.addToCart(productId),
		onSuccess: data => {
			toast.success(data.message)
			fetchUser()
		},
		onError: (err: AxiosError<{ message: string }>) =>
			toast.error(err?.response?.data?.message)
	})
	return (
		<div className='addToCart'>
			<Link
				onClick={() => mutate()}
				to={'/cart'}
				className={`addToCart__buy ${isPending ? 'disabled' : ''}`}
			>
				Купить в 1 клик
			</Link>
			<button
				disabled={isPending}
				onClick={() => mutate()}
				className='addToCart__add'
			>
				{isBig ? 'В корзину' : <CartIcon />}
			</button>
		</div>
	)
}
