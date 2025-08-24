import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import MarkdownEditor from '@uiw/react-markdown-editor'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { FormInput, Modal } from '@/shared/components/ui'
import { type PromoSchema, promoSchema } from '@/shared/schemas'
import { promoService } from '@/shared/services'
import type { ErrorType } from '@/shared/types'

import './_createPromo.scss'

export const CreatePromo = () => {
	const [text, setText] = useState('')
	const [open, setOpen] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(promoSchema)
	})

	const { mutate, isPending } = useMutation({
		mutationFn: (data: PromoSchema) =>
			promoService.createPromo({ ...data, text }),
		onSuccess: () => {
			toast.success('Промо акция успешно создана')
			window.location.reload()
		},
		onError: (err: ErrorType) => {
			console.log(err)
			toast.error(err.response.data.message)
		}
	})

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className={`createPromo__trigger `}
			>
				<Plus />
			</button>

			{open && (
				<Modal
					className='createPromo'
					title={'Создание промо акции'}
					open={open}
					setOpen={setOpen}
				>
					<form
						onSubmit={handleSubmit(
							data => mutate(data),
							err => console.log(err)
						)}
						className='createPromo__form'
					>
						<FormInput
							disabled={isPending}
							errors={errors}
							register={register}
							name='preview'
							label='Превью'
							type='file'
						/>
						<FormInput
							disabled={isPending}
							errors={errors}
							register={register}
							name='image'
							label='Основное изображение'
							type='file'
						/>
						<FormInput
							disabled={isPending}
							errors={errors}
							register={register}
							name='title'
							label='Заголовок промо'
						/>

						<MarkdownEditor
							height={'400px'}
							className='createPromo__editor'
							value={text}
							onChange={setText}
						/>

						<button
							disabled={isPending}
							type='submit'
							className='createPromo__button'
						>
							Создать
						</button>
					</form>
				</Modal>
			)}
		</>
	)
}
