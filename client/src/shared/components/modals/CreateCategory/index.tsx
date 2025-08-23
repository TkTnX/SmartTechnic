import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { FormInput, Modal } from '@/shared/components/ui'
import { type CategorySchema, categorySchema } from '@/shared/schemas'
import { categoriesService } from '@/shared/services'
import type { ErrorType, IProduct } from '@/shared/types'

import './_createCategory.scss'

type Props = {
	product?: IProduct
}

export const CreateCategory = ({ product }: Props) => {
	const [open, setOpen] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(categorySchema)
	})

	const { mutate, isPending } = useMutation({
		mutationFn: (data: CategorySchema) =>
			categoriesService.createCategory(data),
		onSuccess: () => {
			toast.success('Категория успешно создана')
			window.location.reload()
		},
		onError: (err: ErrorType) =>
			toast.error(
				err.response.data.message || err.response.data.message[0]
			)
	})

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className={`createCategory__trigger ${product ? 'edit' : ''}`}
			>
				<Plus />
			</button>

			{open && (
				<Modal
					className='createCategory'
					title={'Создание категории'}
					open={open}
					setOpen={setOpen}
				>
					<form
						onSubmit={handleSubmit(data => mutate(data))}
						className='createCategory__form'
					>
						<FormInput
							defaultValue={product?.name}
							disabled={isPending}
							errors={errors}
							register={register}
							name='name'
							label='Название категории'
						/>

						<button
							disabled={isPending}
							type='submit'
							className='createCategory__button'
						>
							Создать
						</button>
					</form>
				</Modal>
			)}
		</>
	)
}
