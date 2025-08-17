import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { DropdownInput, FormInput, Skeleton } from '@/shared/components'
import { DELIVERY_TYPES, PAYMENT_TYPES } from '@/shared/constants'
import { type PersonalSchema, personalSchema } from '@/shared/schemas'
import { useUserStore } from '@/shared/stores'

import './_personalInfo.scss'
import { useEffect } from 'react'

export const PersonalInfo = () => {
	const { user, isLoading } = useUserStore()
	const {
		register,
		handleSubmit,
        formState: { errors },
        reset
	} = useForm<PersonalSchema>({
        resolver: zodResolver(personalSchema),
        defaultValues: {
            name: user?.name,
            address: user?.address,
            email: user?.email,
            paymentType: user?.paymentType,
            phone: user?.phone,
            deliveryType: user?.deliveryType,
            city: user?.city,
            index: user?.index
        }
	})

	const onSubmit = async (data: PersonalSchema) => {
		console.log(data)
    }
    
    useEffect(() => {
        if (user) {
            reset(user)
        }
    }, [user, reset])

	if (isLoading) return <Skeleton height={454} className='personalInfo' />
	return (
		<section className='personalInfo'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='personalInfo__form'
			>
				<FormInput
                    errors={errors}
                    label='Имя'
                    name='name'
                    register={register}
                    type='text'
                    defaultValue={user?.name}
				/>
				<FormInput
					errors={errors}
					label='Адрес'
					name='address'
					register={register}
                    type='text'
                    defaultValue={user?.address}
				/>
				<FormInput
					errors={errors}
					label='Эл. почта'
					name='email'
					register={register}
                    type='email'
                    defaultValue={user?.email}
				/>
				<DropdownInput
					errors={errors}
					register={register}
					label='Предпочитаемый способ оплаты'
					items={PAYMENT_TYPES}
                    name='paymentType'
                    defaultValue={user?.paymentType}
				/>
				<FormInput
					errors={errors}
					label='Телефон'
					name='phone'
					register={register}
                    type='tel'
                    defaultValue={user?.phone}
				/>
				<DropdownInput
					errors={errors}
					register={register}
					label='Предпочитаемый способ доставки'
					items={DELIVERY_TYPES}
                    name='deliveryType'
                    defaultValue={user?.deliveryType}
				/>
				<FormInput
					errors={errors}
					label='Город'
					name='city'
					register={register}
                    type='text'
                    defaultValue={user?.city}
				/>
				<FormInput
					errors={errors}
					label='Аватар'
					name='avatar'
					register={register}
					type='file'
				/>
				<FormInput
					errors={errors}
					label='Индекс'
					name='index'
					register={register}
                    type='text'
                    defaultValue={user?.index}
				/>
				<button type='submit' className='personalInfo__submit'>
					Сохранить
				</button>
			</form>
		</section>
	)
}
