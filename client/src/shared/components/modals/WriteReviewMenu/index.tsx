import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button, FormInput, FormTextarea, Modal } from '@/shared/components/ui'
import { type ReviewSchema, reviewSchema } from '@/shared/schemas'
import { reviewService } from '@/shared/services'
import type { ErrorType } from '@/shared/types'

import './_writeReviewMenu.scss'

type Props = {
	productId: string
}

export const WriteReviewMenu = ({ productId }: Props) => {
	const [open, setOpen] = useState(false)

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<ReviewSchema>({
		defaultValues: {
			title: '',
			rating: 0,
			comment: ''
		},
		resolver: zodResolver(reviewSchema)
	})

	const { mutate, isPending } = useMutation({
		mutationFn: (data: ReviewSchema) =>
			reviewService.writeReview(productId, data),
		onSuccess: () => toast.success('Отзыв успешно отправлен'),
		onError: (err: ErrorType) =>
			toast.error(
				err.response.data.message || err.response.data.message[0]
			)
	})

	return (
		<>
			<Button
				className='writeReview__button'
				text='Написать отзыв'
				onClick={() => setOpen(true)}
			/>
			<Modal
				className='writeReview__modal'
				setOpen={setOpen}
				open={open}
				title='Написать отзыв'
			>
				<form
					onSubmit={handleSubmit((data: ReviewSchema) =>
						mutate(data)
					)}
					className='writeReview__form'
				>
					<FormInput
						errors={errors}
						register={register}
						name='title'
						label='Заголовок'
					/>
					<FormInput
						errors={errors}
						register={register}
						label='Рейтинг'
						type='number'
						{...register('rating', { valueAsNumber: true })}
					/>
					<FormTextarea
						errors={errors}
						register={register}
						name='comment'
						label='Текст отзыва'
					/>
					<Button
						type='submit'
						disabled={isPending}
						text='Отправить'
					/>
				</form>
			</Modal>
		</>
	)
}
