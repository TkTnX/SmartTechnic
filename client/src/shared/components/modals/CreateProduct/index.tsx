import { ChooseCategory } from '@/features'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { FormInput, FormTextarea, Modal } from '@/shared/components/ui'
import { type ProductSchema, productSchema } from '@/shared/schemas'

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

	const onSubmit = (data: ProductSchema) => {
		console.log(data)
	}

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
						onSubmit={handleSubmit(onSubmit, errors => {
							console.log('Validation errors:', errors)
						})}
						className='createProduct__form'
					>
						<FormInput
							errors={errors}
							register={register}
							name='name'
							label='Название товара'
						/>
						<FormInput
							errors={errors}
							register={register}
							name='price'
							type='number'
							label='Цена товара'
							registerOptions={{ valueAsNumber: true }}
						/>
						<FormInput
							errors={errors}
							register={register}
							name='brand'
							label='Бренд товара'
						/>
						<FormTextarea
							errors={errors}
							register={register}
							name='description'
							label='Описание товара'
						/>
						<FormInput
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
							errors={errors}
							register={register}
							label='Изображения товара'
							name='images'
							type='file'
							multiple

						/>
						<button type='submit' className='createProduct__button'>
							Создать
						</button>
					</form>
				</Modal>
			)}
		</>
	)
}
