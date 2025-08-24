import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import MarkdownEditor from '@uiw/react-markdown-editor'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { FormInput, Modal } from '@/shared/components/ui'
import { type NewsSchema, newsSchema } from '@/shared/schemas'
import { newsService } from '@/shared/services'
import type { ErrorType } from '@/shared/types'

import './_createNews.scss'


export const CreateNews = () => {
	const [text, setText] = useState('')
	const [open, setOpen] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(newsSchema)
	})

	const { mutate, isPending } = useMutation({
		mutationFn: (data: NewsSchema) =>
			newsService.createNews({ ...data, text }),
		onSuccess: () => {
			toast.success('Новость успешно создана')
			window.location.reload()
		},
		onError: (err: ErrorType) => {
			console.log(err)
			toast.error(err.response.data.message[0])
		}
	})

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className={`createNews__trigger `}
			>
				<Plus />
			</button>

			{open && (
				<Modal
					className='createNews'
					title={'Создание новости'}
					open={open}
					setOpen={setOpen}
				>
					<form
						onSubmit={handleSubmit(
							data => mutate(data),
							err => console.log(err)
						)}
						className='createNews__form'
					>
						<FormInput
							disabled={isPending}
							errors={errors}
							register={register}
							name='image'
							label='Изображение'
							type='file'
						/>
						<FormInput
							disabled={isPending}
							errors={errors}
							register={register}
							name='title'
							label='Заголовок новости'
						/>

						<MarkdownEditor
							height={'400px'}
							className='createNews__editor'
							value={text}
							onChange={setText}
						/>

						<button
							disabled={isPending}
							type='submit'
							className='createNews__button'
						>
							Создать
						</button>
					</form>
				</Modal>
			)}
		</>
	)
}
