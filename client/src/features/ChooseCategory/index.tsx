import { useQuery } from '@tanstack/react-query'
import type {
	FieldErrors,
	FieldValues,
	Path,
	UseFormRegister
} from 'react-hook-form'

import { categoriesService } from '@/shared/services'

import './_chooseCategory.scss'
import { Skeleton } from '@/shared/components'

type Props<TFormValues extends FieldValues> = {
	register?: UseFormRegister<TFormValues>
	errors?: FieldErrors<TFormValues>
	name: Path<TFormValues>,
	defaultValue?: string,
}

export const ChooseCategory = <TFormValues extends FieldValues>({
	name,
	errors,
	register,
	defaultValue
}: Props<TFormValues>) => {
	const { data, isPending } = useQuery({
		queryKey: ['categories'],
		queryFn: () => categoriesService.getCategories()
	})

	return (
		<div className='chooseCategory'>
			<p className='chooseCategory__label'>Выбор категории</p>

			<select
				{...register?.(name)}
				defaultValue={defaultValue || data?.[0].id}

				className='chooseCategory__select'
			>
				<option  selected disabled hidden value=''>
					Выберите категорию
				</option>
				{isPending ? (
					[new Array(3)].map((_, index) => (
						<Skeleton key={index} height={48} />
					))
				) : (
					data?.map(category => (
						<option value={category.id} key={category.id}>
							{category.name}
						</option>
					))
				)}
			</select>
			{errors && errors[name] && (
				<p className='formInput__error'>
					{errors[name]?.message as string}
				</p>
			)}
		</div>
	)
}
