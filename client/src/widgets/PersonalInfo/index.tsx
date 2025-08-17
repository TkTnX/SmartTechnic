import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { DropdownInput, FormInput, Skeleton } from '@/shared/components'
import { CITIES, DELIVERY_TYPES, PAYMENT_TYPES } from '@/shared/constants'
import { type PersonalSchema, personalSchema } from '@/shared/schemas'
import { userService } from '@/shared/services'
import { useUserStore } from '@/shared/stores'

import './_personalInfo.scss'

export const PersonalInfo = () => {
	const { user, isLoading } = useUserStore()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<PersonalSchema>({
		resolver: zodResolver(personalSchema)
	})

	const { mutate, isPending, error } = useMutation({
		mutationFn: (data: PersonalSchema) => userService.updateProfile(data),
		onSuccess: () => toast.success('Данные успешно обновлены'),
		onError: (err: AxiosError<{ message: string }>) =>
			toast.error(err.response?.data.message[0])
	})

	useEffect(() => {
		if (user) {
			reset({
				name: user.name ?? '',
				address: user.address ?? '',
				email: user.email ?? '',
				paymentType: user.paymentType ?? 'CARD',
				phone: user.phone ?? '',
				deliveryType: user.deliveryType ?? 'DELIVERY',
				city: user.city ?? '',
				index: user.index ?? '',
				avatar: user.avatar ?? ''
			})
		}
	}, [user, reset])

	if (isLoading) return <Skeleton height={454} className='personalInfo' />
	return (
		<section className='personalInfo'>
			<form
				onSubmit={handleSubmit(data => mutate(data))}
				className='personalInfo__form'
			>
				<FormInput
					disabled={isPending}
					errors={errors}
					label='Имя'
					name='name'
					register={register}
					type='text'
				/>
				<FormInput
					disabled={isPending}
					errors={errors}
					label='Адрес'
					name='address'
					register={register}
					type='text'
				/>
				<FormInput
					disabled={isPending}
					errors={errors}
					label='Эл. почта'
					name='email'
					register={register}
					type='email'
				/>
				<DropdownInput
					disabled={isPending}
					errors={errors}
					register={register}
					label='Предпочитаемый способ оплаты'
					items={PAYMENT_TYPES}
					name='paymentType'
				/>
				<FormInput
					disabled={isPending}
					errors={errors}
					label='Телефон'
					name='phone'
					register={register}
					type='tel'
				/>
				<DropdownInput
					disabled={isPending}
					errors={errors}
					register={register}
					label='Предпочитаемый способ доставки'
					items={DELIVERY_TYPES}
					name='deliveryType'
				/>
				<DropdownInput
					disabled={isPending}
					defaultValue={user?.city || 'Санкт-Петербург'}
					items={CITIES}
					label='Ваш город'
					name='city'
					register={register}
					errors={errors}
				/>
				<FormInput
					disabled={isPending}
					errors={errors}
					label='Аватар'
					name='avatar'
					register={register}
					type='file'
				/>
				<FormInput
					disabled={isPending}
					errors={errors}
					label='Индекс'
					name='index'
					register={register}
					type='text'
				/>
				<button
					disabled={isPending}
					type='submit'
					className='personalInfo__submit'
				>
					Сохранить
				</button>
			</form>
			{error && <p className='error'>{error.response?.data.message}</p>}
		</section>
	)
}
