import { useMutation } from '@tanstack/react-query';
import {  Trash } from 'lucide-react';
import { toast } from 'react-toastify';



import { CreateProduct } from '@/shared/components';
import { productsService } from '@/shared/services';
import type { ErrorType, IProduct } from '@/shared/types';



import './_productActions.scss';





type Props = {
	product: IProduct
}

export const ProductActions = ({ product }: Props) => {
	const { mutate, isPending } = useMutation({
		mutationFn: () => productsService.deleteProduct(product.id),
		onSuccess: () => {
			toast.success('Товар успешно удален')
			window.location.reload()
		},
		onError: (err: ErrorType) => toast.error(err?.response?.data?.message)
	})

	return (
		<div className='productActions'>
			<CreateProduct product={product} />

			<button disabled={isPending} onClick={() => mutate()}>
				<Trash />
			</button>
		</div>
	)
}