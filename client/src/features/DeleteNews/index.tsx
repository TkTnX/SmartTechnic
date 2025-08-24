import { useMutation } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { toast } from 'react-toastify'

import { newsService } from '@/shared/services'
import type { ErrorType } from '@/shared/types'

import './_deleteNews.scss'

type Props = {
	newsId: string
}

export const DeleteNews = ({ newsId }: Props) => {
	const { mutate, isPending } = useMutation({
		mutationFn: () => newsService.deleteNews(newsId),
		onSuccess: () => {
			toast.success('Новость успешно удалена')
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
