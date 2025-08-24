import { useMutation } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { toast } from 'react-toastify'

import {  promoService } from '@/shared/services'
import type { ErrorType } from '@/shared/types'

import './_deleteNews.scss'

type Props = {
	promoId: string
}

export const DeletePromo = ({ promoId }: Props) => {
	const { mutate, isPending } = useMutation({
		mutationFn: () => promoService.deletePromo(promoId),
		onSuccess: () => {
			toast.success('Промо акция успешно удалена')
			window.location.reload()
		},
		onError: (err: ErrorType) => toast.error(err?.response?.data?.message)
	})

	return (
		<button
			onClick={() => mutate()}
			disabled={isPending}
			className='deleteNews'
		>
			<Trash />
		</button>
	)
}
