import { ChooseCategory } from '@/features';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Edit, Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';



import { FormInput, FormTextarea, Modal } from '@/shared/components/ui';
import { type EditProductSchema, type ProductSchema, editProductSchema, productSchema } from '@/shared/schemas';
import { productsService } from '@/shared/services';
import type { ErrorType, IProduct } from '@/shared/types';



import './_createProduct.scss';





type Props = {
	product?: IProduct
}

export const CreateProduct = ({ product }: Props) => {
	const [open, setOpen] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(product ? editProductSchema : productSchema),
		defaultValues: {
			categoryId: product?.categoryId
		}
	})

	const { mutate, isPending } = useMutation({
		mutationFn: (data: EditProductSchema | ProductSchema) =>
			product
				? productsService.editProduct(
						product.id,
						data as EditProductSchema
					)
				: productsService.createProduct(data as ProductSchema),
		onSuccess: () => {
			toast.success(
				product ? 'Товар успешно обновлен' : 'Товар успешно создан'
			)
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
				className={`createProduct__trigger ${product ? 'edit' : ''}`}
			>
				{product ? <Edit /> : <Plus />}
			</button>

			{open && (
				<Modal
					className='createProduct'
					title={
						product ? 'Редактирование товара' : 'Создание товара'
					}
					open={open}
					setOpen={setOpen}
				>
					<form
						onSubmit={handleSubmit(data => mutate(data))}
						className='createProduct__form'
					>
						<FormInput
							defaultValue={product?.name}
							disabled={isPending}
							errors={errors}
							register={register}
							name='name'
							label='Название товара'
						/>
						<FormInput
							defaultValue={product?.price}
							disabled={isPending}
							errors={errors}
							register={register}
							name='price'
							type='number'
							label={product ? 'Новая цена' : 'Цена товара'}
							registerOptions={{ valueAsNumber: true }}
						/>
						{product && (
							<FormInput
								disabled={isPending}
								errors={errors}
								register={register}
								defaultValue={product?.oldPrice}
								name='oldPrice'
								type='number'
								label='Старая цена (необязательно)'
								registerOptions={{ valueAsNumber: true }}
							/>
						)}
						<FormInput
							defaultValue={product?.brand}
							disabled={isPending}
							errors={errors}
							register={register}
							name='brand'
							label='Бренд товара'
						/>
						<FormTextarea
							defaultValue={product?.description}
							disabled={isPending}
							errors={errors}
							register={register}
							name='description'
							label='Описание товара'
						/>

						<FormInput
							defaultValue={product?.quantity}
							disabled={isPending}
							errors={errors}
							register={register}
							name='quantity'
							type='number'
							registerOptions={{ valueAsNumber: true }}
							label='Количество товара'
						/>
						<ChooseCategory
							defaultValue={product?.categoryId}
							name='categoryId'
							errors={errors}
							register={register}
						/>

						{product && product.images && (
							<div className='createProduct__images'>
								{product.images.map((image, index) => (
									<div
										className='createProduct__image'
										key={index}
									>
										<img src={image} alt='product' />
									</div>
								))}
							</div>
						)}

						<FormInput
							disabled={isPending}
							errors={errors}
							register={register}
							label={
								product
									? 'Новые изображения'
									: 'Изображения товара'
							}
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