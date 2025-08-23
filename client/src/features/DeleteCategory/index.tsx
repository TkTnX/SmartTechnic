import { useMutation } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { toast } from 'react-toastify'

import { categoriesService } from '@/shared/services'
import type { ErrorType } from '@/shared/types'

import './_deleteCategory.scss'

type Props = {
	categoryId: string
}

export const DeleteCategory = ({ categoryId }: Props) => {
	const { mutate, isPending } = useMutation({
		mutationFn: () => categoriesService.deleteCategory(categoryId),
		onSuccess: () => {
			toast.success('Категория успешно удалена')
			window.location.reload()
		},
		onError: (err: ErrorType) => toast.error(err?.response?.data?.message)
	})

	return (
		<button
			onClick={() => mutate()}
			disabled={isPending}
			className='deleteCategory'
		>
			<Trash />
		</button>
	)
}
