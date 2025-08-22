import { ChooseCategory } from '@/features'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { FormInput, FormTextarea, Modal } from '@/shared/components/ui'
import { type ProductSchema, productSchema } from '@/shared/schemas'
import { productsService } from '@/shared/services'
import type { ErrorType } from '@/shared/types'

import './_createProduct.scss'

export const CreateProduct = () => {
	const [open, setOpen] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(productSchema)
	})

	const { mutate, isPending } = useMutation({
		mutationFn: (data: ProductSchema) =>
			productsService.createProduct(data),
		onSuccess: () => {
			toast.success('Товар успешно создан')
			window.location.reload()
		},
		onError: (err: ErrorType) => toast.error(err.response.data.message[0])
	})

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className='createProduct__trigger'
			>
				<Plus />
			</button>

			{open && (
				<Modal
					className='createProduct'
					title='Создание товара'
					open={open}
					setOpen={setOpen}
				>
					<form
						onSubmit={handleSubmit(data => mutate(data))}
						className='createProduct__form'
					>
						<FormInput
							disabled={isPending}
							errors={errors}
							register={register}
							name='name'
							label='Название товара'
						/>
						<FormInput
							disabled={isPending}
							errors={errors}
							register={register}
							name='price'
							type='number'
							label='Цена товара'
							registerOptions={{ valueAsNumber: true }}
						/>
						<FormInput
							disabled={isPending}
							errors={errors}
							register={register}
							name='brand'
							label='Бренд товара'
						/>
						<FormTextarea
							disabled={isPending}
							errors={errors}
							register={register}
							name='description'
							label='Описание товара'
						/>
						<FormInput
							disabled={isPending}
							errors={errors}
							register={register}
							name='quantity'
							type='number'
							registerOptions={{ valueAsNumber: true }}
							label='Количество товара'
						/>
						<ChooseCategory
							name='categoryId'
							errors={errors}
							register={register}
						/>
						<FormInput
							disabled={isPending}
							errors={errors}
							register={register}
							label='Изображения товара'
							name='images'
							type='file'
							multiple
						/>
						<button
							disabled={isPending}
							type='submit'
							className='createProduct__button'
						>
							Создать
						</button>
					</form>
				</Modal>
			)}
		</>
	)
}
