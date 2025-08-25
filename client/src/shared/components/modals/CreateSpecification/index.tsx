import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button, FormInput, Modal } from '@/shared/components/ui'
import { type SpecificationSchema, specificationSchema } from '@/shared/schemas'
import { specificationsService } from '@/shared/services'
import type { ErrorType } from '@/shared/types'

import './_createSpecification.scss'

type Props = {
	productId: string
	categoryId: string
}

export const CreateSpecification = ({ productId, categoryId }: Props) => {
	const [open, setOpen] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<SpecificationSchema>({
		resolver: zodResolver(specificationSchema)
	})

	const { mutate, isPending } = useMutation({
		mutationFn: (data: SpecificationSchema) =>
			specificationsService.createSpecification(
				productId,
				categoryId,
				data
			),
		onSuccess: () => {
			toast.success('Характеристика успешно создана')
			window.location.reload()
		},
		onError: (err: ErrorType) => toast.error(err?.response?.data?.message)
	})

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className={`createSpecification__trigger`}
			>
				<Plus />
			</button>

			{open && (
				<Modal
					className='createSpecification'
					title={'Создание характеристики'}
					open={open}
					setOpen={setOpen}
				>
					<form
						onSubmit={handleSubmit(data => mutate(data))}
						className='createSpecification__form'
					>
						<FormInput
							disabled={isPending}
							errors={errors}
							register={register}
							name='title'
							label='Название характеристики'
						/>
						<FormInput
							disabled={isPending}
							errors={errors}
							register={register}
							name='value'
							label='Значение характеристики'
						/>

						<Button
							disabled={isPending}
							type='submit'
							text='Создать'
						/>
					</form>
				</Modal>
			)}
		</>
	)
}
